import { BloomFilter } from "./bloomfilter.js";

var bloom = new BloomFilter(32 * 256, 16)

bloom.add("TSLA")
bloom.add("NFLX")
bloom.add("NET")

export function isATicker(word) {
    return bloom.test(word)
}