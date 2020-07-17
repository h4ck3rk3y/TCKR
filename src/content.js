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
            console.log(word)
            if (isATicker(word)) {
                textContent.replace(word, "foobar")
            }
        });
        node.textContent = textContent;
    }
}

walkTheDOM(dom, replaceAll)

