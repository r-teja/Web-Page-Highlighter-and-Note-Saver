console.log("background running..!!");

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    chrome.extension.sendMessage({ greeting: "hello",word: message.action});
});


