import { BloomFilter } from "bloomfilter";

var bloom = new BloomFilter(32 * 256, 16)

bloom.add("TSLA")

function isATicker(word) {
    return bloom.test(word)
}