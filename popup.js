/**
 * Populates acronym dictionary listbox onload 'body' in 'popup.html'
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
 * 
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
 * 
 */
function delFromDict(){

}

function main(){
    // Listener for calling 'populateListbox()' onload of 'body' element
    document.getElementsByTagName("body")[0].addEventListener("load", populateListbox(), false);
    // Listener for 'addToDict()' onclick for button id 'addtoDictButton' 
    document.getElementById("addToDictButton").addEventListener("click", addToDict);
}

main()
