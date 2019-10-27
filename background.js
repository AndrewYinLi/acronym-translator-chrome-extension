var dict = new Map();
var dictLoaded = false;

function acronymTranslate(info, tab){
    if (dictLoaded) {
        if (dict.has(info.selectionText)) {
            // Replace info.selectionText with dict.get(info.selectionText)
        } else {
            alert("This acronym is not in the dictionary!")
            // in the future, prompt with yes/no to add to dictionary
        }
    } else {
        alert("The acronym dictionary has not finished loading yet!")
    }
}

function addAcronymToDict(info){
    
}

function loadDict() {
    return new Promise(resolve => {
        fetch("dict.txt").then(response => response.text()).then(lines => {
            lines = lines.split("\n");
            for (var i = 0; i < lines.length; i++) {
                lineSplit = lines[i].split(" : ");
                newDict.set(lineSplit[0], lineSplit[1]);
            }
            resolve(true);
        });
    });
}
  
async function asyncLoadDict() {
    var resolution = await loadDict();
    dictLoaded = resolution;
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

    asyncLoadDict();
}

main()
