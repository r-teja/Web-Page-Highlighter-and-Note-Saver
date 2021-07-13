console.log("Chrome extension running");

chrome.runtime.onMessage.addListener(function (request) {
    if (request.action === 'executeCode') {
        var colour = request.color;
        console.log(colour);
        window.addEventListener('mouseup', function () {
            let text = window.getSelection().toString();
            var userSelection = window.getSelection();
            var range, sel;
            if (window.getSelection) {
                // IE9 and non-IE
                try {
                    if (!document.execCommand("BackColor", false, colour)) {
                        makeEditableAndHighlight(colour);
                    }
                } catch (ex) {
                    makeEditableAndHighlight(colour);
                }
            } else if (document.selection && document.selection.createRange) {
                range = document.selection.createRange();
                range.execCommand("BackColor", false, colour);
            };
            function makeEditableAndHighlight(colour) {
                document.designMode = "on";
                var range, sel = window.getSelection();
                if (sel.rangeCount && sel.getRangeAt) {
                    range = sel.getRangeAt(0);
                };
                if (range) {
                    sel.removeAllRanges();
                    sel.addRange(range);
                };
                // Using HiliteColor since some browsers apply BackColor to the whole block
                if (!document.execCommand("HiliteColor", false, colour)) {
                    document.execCommand("BackColor", false, colour);
                };
                document.designMode = "off";
            };

        })

    }
    else {
        var txt = "";
        var spantags = document.querySelectorAll("span");
        console.log(spantags);
        for (let i = 0; i < spantags.length; i++) {
            var tagcolor = spantags[i].style.backgroundColor;
            if (tagcolor == "rgb(231, 95, 95)" || tagcolor == "rgb(255, 166, 181)" || tagcolor == "rgb(0, 255, 255)" || tagcolor == "rgb(255, 238, 0)" || tagcolor == "rgb(0, 255, 0)") {
                var ans = spantags[i].innerHTML;
                console.log(ans);
                txt+=ans;
            }
        }
        console.log(txt);
        let msg={
            action:txt,
            tabid: request.tabid
        }
        chrome.runtime.sendMessage(msg);
    }
});
