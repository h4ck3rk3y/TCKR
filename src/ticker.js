const { BloomFilter } = require("bloomfilter");

var bloom = new BloomFilter(32 * 256, 16)