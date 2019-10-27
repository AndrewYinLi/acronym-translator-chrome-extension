function setNewDefinition(acronym){
    newDefinition = prompt("Input definition for \"" + acronym + "\":","");
    if (newDefinition != null && newDefinition != "") {
        chrome.storage.sync.set({acronym: newDefinition});
    }
}

function acronymTranslate(info){
    var acronym = info.selectionText.toUpperCase();
    chrome.storage.sync.get({acronym: null}, function(pair){
        var definition = pair.acronym;
        if (definition != null) {
            alert("Translation: \"" + definition + "\".");
        } else if(acronym.split(" ").length > 1) {
            alert("Multiple words were selected. Please select a single acronym.")
        } else {
            if (confirm("The selected acronym is not in the dictionary. Add to dictionary?")) {
               setNewDefinition(acronym);
            }
        }
    });
}

function addAcronymToDict(info){
    var acronym = info.selectionText.toUpperCase();
    chrome.storage.sync.get({acronym: null}, function(pair){
        var definition = pair.acronym;
        if (definition != null) { // pair.text accesses the definition
            if (confirm("The selected acronym is already in the dictionary as \"" + definition + "\". Overwrite dictionary definition?")) {
                setNewDefinition(acronym);
             }
        } else if(acronym.split(" ").length > 1) {
            alert("Multiple words were selected. Please select a single acronym.")
        } else {
           setNewDefinition(acronym);
        }
    });
   
}

function main() {

    // Create context menu
    chrome.contextMenus.create({
        title: "Acronym Translate",
        id: "parent",
        contexts:["selection"]
    });
    chrome.contextMenus.create({
        title: "Translate acronym",
        parentId: "parent",
        contexts:["selection"],
        onclick: acronymTranslate
    });
    chrome.contextMenus.create({
        title: "Add acronym to dictionary",
        parentId: "parent",
        contexts:["selection"],
        onclick: addAcronymToDict
    });
}

main()
