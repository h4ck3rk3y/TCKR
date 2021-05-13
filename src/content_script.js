import 'regenerator-runtime'

(async () => {
    const src = chrome.runtime.getURL("content.js");
  console.log(src)
    const contentMain = await import(src);
    contentMain.main();
})();
