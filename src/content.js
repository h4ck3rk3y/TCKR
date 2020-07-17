import { isATicker } from "./ticker.js"

const dom = document.getRootNode()

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
        var textContent = node.textContent;
        var splitString = textContent.split(" ")
        splitString.forEach(word => {
            if (isATicker(cleanString(word))) {
                textContent = textContent.replace(word, "foobar");
                node.textContent = textContent;
            }
        });
    }
}

function cleanString(word) {
    return word.replace(/[\n\r]+/g, '');
}

export function main() {
    walkTheDOM(dom, replaceAll)
}

