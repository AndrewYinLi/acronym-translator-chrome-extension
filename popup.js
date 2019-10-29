/**
 * Populates acronym dictionary listbox 'dict_listbox' 
 * Called onload 'body' in 'popup.html'
 */
function populateListbox(){
    var listbox = document.getElementById("dict_listbox");
    chrome.storage.sync.get(null, function(items) {
        var allKeys = Object.keys(items);
        allKeys.forEach(acronym => {
            chrome.storage.sync.get(acronym, function(pair){
                var definition = pair[acronym];
                listbox.options[listbox.options.length] = new Option(acronym + " : " + definition);
            }); 
        });
    });
}

/**
 * Adds acronym to acronym dictionary listbox 'dict_listbox'
 * Called onclick 'addToDictButton' button
 */
function addToDict(){
    var acronym = prompt("Input acronym:");
    chrome.storage.sync.get(acronym, function(pair){
        var definition = pair[acronym];
        if (definition != null) {
            if (!confirm("The selected acronym is already in the dictionary as \"" + definition + "\". Overwrite dictionary definition?")) {
               return;
            }
        }
        newDefinition = prompt("Input definition for \"" + acronym + "\":","");
        if (newDefinition != null && newDefinition != "") {
            chrome.storage.sync.set({[acronym]:newDefinition});
            var listbox = document.getElementById("dict_listbox");
            listbox.options[listbox.options.length] = new Option(acronym + " : " + newDefinition);
        }
    });
}

/**
 * Deletes acronym from acronym dictionary listbox 'dict_listbox'
 * Called onclick 'deleteFromDictButton' button
 */
function delFromDict(){
    var listbox = document.getElementById("dict_listbox");
    for(var i = 0; i < listbox.length; i++){
        if(listbox.options[i].selected){
            var acronym = listbox.options[i].value.split(" : ")[0];
            chrome.storage.sync.remove([acronym]);
            listbox.remove(i);
        }
    }
}

function main(){
    // Listener for onload of body element in 'popup.html', calls 'populateListbox()' 
    document.getElementsByTagName("body")[0].addEventListener("load", populateListbox(), false);
    // Listener for onclick for button id 'addtoDictButton', calls 'addToDict()' 
    document.getElementById("addToDictButton").addEventListener("click", addToDict);
    // Listener for onclick for button id 'delFromDictButton', calls 'delFromDict()' 
    document.getElementById("delFromDictButton").addEventListener("click", delFromDict);
}

main()
