function theFirstFunction(){
    alert("yeet");
}

function theSecondFunction(){
    alert("deet");
}

chrome.contextMenus.create({
    title: "Acronym Translate",
    id: "parent",
    contexts:["selection"]
});
  
chrome.contextMenus.create({
    title: "The first action to click",
    parentId: "parent",
    contexts:["selection"],
    onclick: theFirstFunction
});
  
chrome.contextMenus.create({
    title: "The second action to click",
    parentId: "parent",
    contexts:["selection"],
    onclick: theSecondFunction
});

