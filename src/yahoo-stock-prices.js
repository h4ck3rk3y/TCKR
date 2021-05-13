const baseUrl = "https://finance.yahoo.com/quote/";

/**
 * @param {string} ticker
 *
 * @return {Promise<{price: number, currency: string}>}
 */
const getCurrentData = function (ticker) {
  return fetch(`${baseUrl + ticker}/`)
    .then((x) => x.text())
    .then((res) => {
      let price = res
        .split(`"${ticker}":{"sourceInterval"`)[1]
        .split("regularMarketPrice")[1]
        .split('fmt":"')[1]
        .split('"')[0];

      let change = res
        .split(`"${ticker}":{"sourceInterval"`)[1]
        .split("regularMarketChange")[1]
        .split('fmt":"')[1]
        .split('"')[0];

      let changePercent = res
        .split(`"${ticker}":{"sourceInterval"`)[1]
        .split("regularMarketChangePercent")[1]
        .split('fmt":"')[1]
        .split('"')[0];

      price = parseFloat(price.replace(",", ""));

      const currencyMatch = res.match(/Currency in ([A-Za-z]{3})/);
      let currency = null;
      if (currencyMatch) {
        currency = currencyMatch[1];
      }


      return {
        price, change, changePercent
      };
    })
    .catch((e) => console.error(e));
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.contentScriptQuery == "ticker") {
    getCurrentData(request.tickerName).then((res) => {
      return sendResponse(res);
    });
    return true; // Will respond asynchronously.
  }
});
