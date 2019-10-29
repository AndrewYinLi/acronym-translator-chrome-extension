/**
 * Prompts user to set a new definition (val) for an acronym (key)
 * @param   {string} acronym    the acronym (key) to map the new definition (val) to
 */
function setNewDefinition(acronym){
    newDefinition = prompt("Input definition for \"" + acronym + "\":","");
    if (newDefinition != null && newDefinition != "") {
        chrome.storage.sync.set({[acronym]:newDefinition});
    }
}

/**
 * On-click function for translating an acronym
 * @param   {object} info    Information about the item clicked and the context where the click happened. 
 *                           Documentation: https://developer.chrome.com/apps/contextMenus
 */
function acronymTranslate(info){
    var acronym = info.selectionText.toUpperCase();
    chrome.storage.sync.get(acronym, function(pair){
        var definition = pair[acronym];
        if (definition != null) { // Definition exists
            alert("Translation:\n\"" + definition + "\".");
        } else if (acronym.split(" ").length > 1) { // Multiple words selected
            alert("Multiple words were selected. Please select a single acronym.")
        } else if (confirm("The selected acronym is not in the dictionary. Add to dictionary?")) { // Definition doesn't exist, prompt user on adding to dictionary
            setNewDefinition(acronym);
        }
    });
}

/**
 * On-click function for mapping an acronym to a definition
 * @param   {object} info    Information about the item clicked and the context where the click happened. 
 *                           Documentation: https://developer.chrome.com/apps/contextMenus
 */
function addAcronymToDict(info){
    var acronym = info.selectionText.toUpperCase();
    chrome.storage.sync.get(acronym, function(pair){
        var definition = pair[acronym];
        if (definition != null) { // Definition exists, prompt user on whether to overwrite
            if (confirm("The selected acronym is already in the dictionary as \"" + definition + "\". Overwrite dictionary definition?")) {
                setNewDefinition(acronym);
            }
        } else if (acronym.split(" ").length > 1) { // Multiple words selected
            alert("Multiple words were selected. Please select a single acronym.")
        } else { // Definition doesn't exist, add to dictionary
           setNewDefinition(acronym);
        }
    });
}

function main() {

    // Create context menu
    // Documentation: https://developer.chrome.com/apps/contextMenus
    chrome.contextMenus.create({ // Parent menu
        title: "Acronym Translate",
        id: "parent",
        contexts:["selection"]
    });
    chrome.contextMenus.create({ // Menu child
        title: "Translate acronym",
        parentId: "parent",
        contexts:["selection"],
        onclick: acronymTranslate
    });
    chrome.contextMenus.create({ // Menu child
        title: "Add acronym to dictionary",
        parentId: "parent",
        contexts:["selection"],
        onclick: addAcronymToDict
    });
}

main();
