var stream = require('stream');

function Cache(key, options) {
  stream.Writable.call(this, options);
  this._key = key;
  this._value = [];
  this.on('finish', function() {
    Cache.store[this._key] = this._value.toString();
  });
};
Cache.store = {};
Cache.prototype = Object.create(stream.Writable.prototype);
Cache.prototype.constructor = Cache;

Cache.prototype._write = function(chunk, encoding, callback) {
  if (!this._value) {
    this._value = chunk;
  } else {
    this._value.push(chunk);
  }
  callback();
};

module.exports = Cache;
