var suggestions = new Array();
var outp;
var oldins;
var posi = -1;
var words = new Array();
var input;
var key;
var targetElement = "";
var targetShadow = "";
var targetOutput = "";
var setvisible = true;

function dynamicAutoComplete(elementName, arrContents, shadowName, outputName) {

    suggestions = arrContents;
    targetElement = elementName;

    if (shadowName === undefined || outputName === undefined) {
        shadowName = "shadow";
        outputName = "output";
    }

    targetShadow = shadowName;
    targetOutput = outputName;
    setvisible = true;
    if (suggestions.length > 0 && targetElement != "" && targetShadow != "" && targetOutput != "") {
        init();
    }
}

function hideAutoComplete() {
    setvisible = false;
}
function setVisible(visi) {
    var x = document.getElementById(targetShadow);
    var t = document.getElementsByName(targetElement)[0];
    x.style.position = 'absolute';
    x.style.top = (findPosY(t) + 3) + "px";
    x.style.left = (findPosX(t) + 2) + "px";
    x.style.visibility = visi;
}

function init() {
    outp = document.getElementById(targetOutput);
    window.setInterval("lookAt()", 100);
    setVisible("hidden");
    document.onkeydown = keygetter; //needed for Opera...
    document.onkeyup = keyHandler;
}

function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (obj.offsetParent) {
            curleft += obj.offsetLeft;
            obj = obj.offsetParent;
        }
    }
    else if (obj.x)
        curleft += obj.x;
    return curleft;
}

function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        curtop += obj.offsetHeight;
        while (obj.offsetParent) {
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        }
    }
    else if (obj.y) {
        curtop += obj.y;
        curtop += obj.height;
    }
    return curtop;
}

function lookAt() {
    var ins = document.getElementsByName(targetElement)[0].value;
    if (oldins == ins) return;
    else if (posi > -1);
    else if (ins.length > 0) {
        words = getWord(ins);
        if (words.length > 0) {
            clearOutput();

            //set auto scroll
            if (words.length > 7) {
                jQuery("#" + targetOutput).css("height", "150px");
                jQuery("#" + targetOutput).css("overflow-y", "scroll");
            }
            else {
                jQuery("#" + targetOutput).css("height", "100%");
                jQuery("#" + targetOutput).css("overflow-y", "hidden");
            }

            for (var i = 0; i < words.length; ++i) addWord(words[i]);
            if (setvisible)
                setVisible("visible");
            else
                setVisible("hidden");
            input = document.getElementsByName(targetElement)[0].value;
        }
        else {
            setVisible("hidden");
            posi = -1;
        }
    }
    else {
        setVisible("hidden");
        posi = -1;
    }
    oldins = ins;
}

function addWord(word) {
    var sp = document.createElement("div");
    sp.appendChild(document.createTextNode(word));
    sp.onmouseover = mouseHandler;
    sp.onmouseout = mouseHandlerOut;
    sp.onclick = mouseClick;
    outp.appendChild(sp);
}

function clearOutput() {
    while (outp.hasChildNodes()) {
        noten = outp.firstChild;
        outp.removeChild(noten);
    }
    posi = -1;
}

function getWord(beginning) {
    var words = new Array();
    for (var i = 0; i < suggestions.length; ++i) {
        var j = -1;
        var correct = 1;
        while (correct == 1 && ++j < beginning.length) {
            if (suggestions[i].charAt(j).toUpperCase() != beginning.charAt(j).toUpperCase()) correct = 0;
        }
        if (correct == 1) words[words.length] = suggestions[i];
    }
    return words;
}


function setColor(_posi, _color, _forg) {
    outp.childNodes[_posi].style.background = _color;
    outp.childNodes[_posi].style.color = _forg;
}

function keygetter(event) {
    if (!event && window.event) event = window.event;
    if (event) key = event.keyCode;
    else key = event.which;
}

function keyHandler(event) {
    if (document.getElementById(targetShadow).style.visibility == "visible") {
        var textfield = document.getElementsByName(targetElement)[0];
        if (key == 40) { //Key down
            //alert (words);
            if (words.length > 0 && posiwords.length - 1) {
                if (posi >= 0) setColor(posi, "#fff", "#333333");
                else input = textfield.value;
                setColor(++posi, "#B5B1B3", "white");
                textfield.value = outp.childNodes[posi].firstChild.nodeValue;
            }
        }
        else if (key == 38) { //Key up
            if (words.length > 0 && posi >= 0) {
                if (posi >= 1) {
                    setColor(posi, "#fff", "#333333");
                    setColor(--posi, "#B5B1B3", "white");
                    textfield.value = outp.childNodes[posi].firstChild.nodeValue;
                }
                else {
                    setColor(posi, "#fff", "#333333");
                    textfield.value = input;
                    textfield.focus();
                    posi--;
                }
            }
        }
        else if (key == 27) { // Esc
            textfield.value = input;
            setVisible("hidden");
            posi = -1;
            oldins = input;
        }
        else if (key == 8) { // Backspace
            posi = -1;
            oldins = -1;
        }
    }
}

var mouseHandler = function () {
    for (var i = 0; i < words.length; ++i)
        setColor(i, "white", "black");

    this.style.background = "#08c";
    this.style.color = "white";
    this.style.cursor = "pointer";
}


var mouseHandlerOut = function () {
    this.style.background = "white";
    this.style.color = "#333333";
}

var mouseClick = function () {
    document.getElementsByName(targetElement)[0].value = this.firstChild.nodeValue;
    setVisible("hidden");
    posi = -1;
    oldins = this.firstChild.nodeValue;
}
	
