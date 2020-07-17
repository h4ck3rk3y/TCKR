const dom = document.documentElement

var inner = dom.innerHTML

var res = inner.replace(/TSLA/g, "foobar")

dom.innerHTML = res;

