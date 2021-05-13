import {BloomFilter} from "./bloom.js"

var bloom = new BloomFilter(32 * 256, 16);

const url = chrome.runtime.getURL('config.json')
fetch(url)
  .then((response) => {return response.json();})
  .then((json) => {
    json.tickers.forEach(x => {bloom.add(x)});
  });


function isATicker(word) {
  return bloom.test(word);
}

function getTickerValue(word) {
  return new Promise((res) => {
    chrome.runtime.sendMessage(
      { contentScriptQuery: "ticker", tickerName: word },
      (data) => {
        if (parseFloat(data.change) > 0){
          res(
              `<div id="TCKRSPCL" class="${word}" style="color:green;display:inline-block">${word} ▲ ${data.price} ${data.change} ${data.changePercent}</div>`
          );
        } else {
          res(
            `<div id="TCKRSPCL" class="${word}" style="color:red;display:inline-block">${word} ▼ ${data.price} ${data.change} ${data.changePercent}</div>`
          );
        }
      }
    );
  });
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
    var splitString = textContent.split(" ");
    var newContent = textContent;
    if (node.parentElement.id == "TCKRSPCL") {
      let tckr = node.parentElement.className;
      getTickerValue(tckr)
        .then((x) => {
          return x;
        })
        .then((x) => {
          // BD: this seems to break with element has no parent node
          if (node.parentElement) {
            node.parentElement.outerHTML = x;            
          }
        });
      return;
    }

    // BD: Use Promise.all or something
    // BD: Do a single network call for every occurence of the same ticker
    // return a list of WORDS
    // BD: change the dom after all changes are done


    let changed = false;
    splitString.forEach((word) => {
      if (isATicker(cleanString(word))) {
        changed = true;
        getTickerValue(word).then(
          (x) => {
            newContent = newContent.replace(word, x);
            if (changed && node.parentElement && node.parentElement.tagName != "TITLE") {
              node.parentElement.innerHTML = newContent;
            }
          }
        )
      }
    });
  }
}

function cleanString(word) {
  return word.replace(/[\n\r]+/g, "");
}

export function main() {
  const dom = document.getRootNode();
  setInterval(function () {
    walkTheDOM(dom, replaceAll);
  }, 10000);
}
