var Alphabet = require('./alphabet');
var Cache = require('./cache');
var alpha = new Alphabet();
var cache = new Cache('alpha1');
var cache2 = new Cache('nums1');
const Numbers = require('./numbers');
const num = new Numbers(1, 20);

alpha.pipe(cache);
num.pipe(cache2);

cache2.on('finish', function() {
  console.log('Cache store:');
  for (var key in Cache.store) {
    console.log(key, ':', Cache.store[key]);
  }
})

// num.on('data', function(chunk) {
//   console.log(chunk.toString());
// });

// alpha is now an instance (readable) of Class Alphabet
// alpha.on('data', function(chunk) {
//   console.log(chunk.toString());
// });
