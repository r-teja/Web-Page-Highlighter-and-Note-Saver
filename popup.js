var el = document.getElementById("hbutton");
var el2 = document.getElementById("uhbutton");
var el3 = document.getElementById("savebutton");

document.getElementById("htmlsave").addEventListener('click', callhtmlsave, false);
document.getElementById("txtsave").addEventListener('click', calltxtsave, false);

if (el) {
    el.addEventListener('click', highlightclicked, false);
} else {
    console.log("cannot add event listener for highlight button ");
}

if (el2) {
    el2.addEventListener('click', unhighlightclicked, false);
}
else {
    console.log("cannot add event listener for unhighlight button ");
}

if (el3) {
    el3.addEventListener('click', saveclicked, false);
}
else {
    console.log("cannot add event listener for download button ");
}


function highlightclicked() {

    var selectcolor = "black";

    document.getElementById("addbox").className = "hcolors";
    setTimeout(removeClass, 5000);

    function removeClass() {
        document.getElementById("addbox").className = "";
    }

    var redbutton = document.getElementById("red");
    var yellowbutton = document.getElementById("yellow");
    var greenbutton = document.getElementById("green");
    var bluebutton = document.getElementById("blue");
    var pinkbutton = document.getElementById("pink");

    redbutton.addEventListener('click', setcolorRed, false);
    yellowbutton.addEventListener('click', setcolorYellow, false);
    greenbutton.addEventListener('click', setcolorGreen, false);
    bluebutton.addEventListener('click', setcolorBlue, false);
    pinkbutton.addEventListener('click', setcolorPink, false);

    function setcolorRed() {
        var my_red = "rgb(231, 95, 95)";
        chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
            chrome.tabs.sendMessage(activeTabs[0].id, { action: 'executeCode', color: my_red });
        });
    }

    function setcolorYellow() {
        var my_yellow = "rgb(255, 238, 0)";
        chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
            chrome.tabs.sendMessage(activeTabs[0].id, { action: 'executeCode', color: my_yellow });
        });
    }
    function setcolorGreen() {
        var my_green = "rgb(0, 255, 0)";
        chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
            chrome.tabs.sendMessage(activeTabs[0].id, { action: 'executeCode', color: my_green });
        });
    }
    function setcolorBlue() {
        var my_blue = "rgb(0, 255, 255)";
        chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
            chrome.tabs.sendMessage(activeTabs[0].id, { action: 'executeCode', color: my_blue });
        });
    }
    function setcolorPink() {
        var my_pink = "rgb(255, 166, 181)";
        chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
            chrome.tabs.sendMessage(activeTabs[0].id, { action: 'executeCode', color: my_pink });
        });
    }

}

function unhighlightclicked() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
        chrome.tabs.sendMessage(activeTabs[0].id, { action: 'executeCode', color: 'transparent' });
    });
}

function saveclicked() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (activeTabs) {
        chrome.tabs.sendMessage(activeTabs[0].id, { action: 'download' });
    });

    chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.greeting == "hello") {
            console.log(request.word);
            var textdialog = document.getElementById("displayarea");
            textdialog.value = request.word;
        }
    });

}
function callhtmlsave() {

    var txtentered = document.getElementById("displayarea").value;
    var filename = document.getElementById("fname").value + ".html";
    console.log(filename);
    console.log(txtentered);
    download(filename,txtentered);
}

function calltxtsave() {
    //document.addtext.name.value = document.addtext.name.value + ".txt";

    var txtentered = document.getElementById("displayarea").value;
    var filename = document.getElementById("fname").value + ".txt";
    console.log(filename);
    console.log(txtentered);
    download(filename,txtentered);
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' +

        encodeURIComponent(text));
    pom.setAttribute('download', filename);

    pom.style.display = 'none';
    document.body.appendChild(pom);

    pom.click();

    document.body.removeChild(pom);
}







