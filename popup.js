function main(){
    var listbox = document.getElementById("dict_listbox");
    chrome.storage.sync.get(null, function(items) {
        var allKeys = Object.keys(items);
        allKeys.forEach(acronym => {
            chrome.storage.sync.get(acronym, function(pair){
                var definition = pair[acronym];
                listbox.options[listbox.options.length] = new Option(acronym + " " + definition);
            }); 
        });
    });
}

main();