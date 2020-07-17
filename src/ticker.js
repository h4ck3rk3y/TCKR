import { BloomFilter } from "./bloomfilter.js";

var bloom = new BloomFilter(32 * 256, 16)

bloom.add("TSLA")
bloom.add("NFLX")
bloom.add("NET")
bloom.add("GOOG")
bloom.add("FB")
bloom.add("AAPL")
bloom.add("AMZN")
bloom.add("SPCE")
bloom.add("TQQQ")
bloom.add("MSFT")
bloom.add("NKLA");

export function isATicker(word) {
    return bloom.test(word)
}