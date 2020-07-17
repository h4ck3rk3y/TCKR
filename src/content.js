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
        textContent = textContent.replace(/TSLA/g, 'foobar');
        node.textContent = textContent;
    }
}

walkTheDOM(dom, replaceAll)

