import { isATicker } from "./ticker.js"

function getTickerValue(word) {
    const html1 = `<div id="TCKRSPCL" class="${word}" style="background-color:black;color:green;display:inline-block">${word} 1500.84(0.0013%) ▲</div>`
    const html2 = `<div id="TCKRSPCL" class="${word}" style="background-color:black;color:green;display:inline-block">${word} 1591.84(0.1923%) ▲</div>`
    const html3 = `<div id="TCKRSPCL" class="${word}" style="background-color:black;color:red;display:inline-block">${word} 1394.84(-1.3441%) ▼</div>`
    const html4 = `<div id="TCKRSPCL" class="${word}" style="background-color:black;color:green;display:inline-block">${word} 2100.84(17.001%) ▲</div>`
    const html5 = `<div id="TCKRSPCL" class="${word}" style="background-color:black;color:red;display:inline-block">${word} 1294.84(-3.3441%) ▼</div>`

    let items = [html1, html2, html3, html4, html5];
    let index = Math.floor(Math.random() * items.length);
    return items[index];
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
        if (node.parentElement.id == "TCKRSPCL") {
            let tckr = node.parentElement.className;
            node.parentElement.innerHTML = getTickerValue(tckr)
            return
        }

        splitString.forEach(word => {
            if (isATicker(cleanString(word))) {
                newContent = newContent.replace(word, getTickerValue(word));
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
    const dom = document.getRootNode()
    setInterval(function () {
        walkTheDOM(dom, replaceAll);
    }, 10000)
}

