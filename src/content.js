import { isATicker } from "./ticker.js"

function getTickerValue() {
    const html1 = `<div style="background-color:black;color:green;display:inline-block">TSLA 1500.84(0.0013%) ▲</div>`
    const html2 = `<div style="background-color:black;color:green;display:inline-block">TSLA 1591.84(0.1923%) ▲</div>`
    const html3 = `<div style="background-color:black;color:red;display:inline-block">TSLA 1394.84(-1.3441%) ▼</div>`
    let items = [html1, html2, html3];
    return items[Math.floor(Math.random() * items.length)];
}

function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
}

function replaceAll(node) {
    if (node && node.nodeType == 3) {
        var textContent = node.nodeValue;
        var splitString = textContent.split(" ")
        var newContent = textContent;
        splitString.forEach(word => {
            if (isATicker(cleanString(word))) {
                newContent = textContent.replace(word, getTickerValue());
            }
        });
        if (textContent != newContent && node.parentElement.tagName != "TITLE") {
            node.parentElement.innerHTML = newContent;
        }
    }
}

function cleanString(word) {
    return word.replace(/[\n\r]+/g, '');
}

export function main() {
    let dom = document.getRootNode()
    const immutableRoot = dom.cloneNode(true)
    setInterval(function () {
        document.rootNode = immutableRoot;
        dom = document.getRootNode();
        walkTheDOM(dom, replaceAll);
    }, 5000)
}

