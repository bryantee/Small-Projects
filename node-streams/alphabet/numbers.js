const stream = require('stream');

const Numbers = function(startNumber, endNumber, options) {
  stream.Readable.call(this, options)
  this._start = startNumber;
  this._end = endNumber;
  this._currNum = null;
}

Numbers.prototype = Object.create(stream.Readable.prototype);
Numbers.prototype.constructor = Numbers;

Numbers.prototype._read = function () {
  if (!this._currNum) this._currNum = this._start;
  let buf = new Buffer(this._currNum.toString());
  this.push(buf);
  if (this._currNum == this._end) this.push(null);
  this._currNum++;
};

module.exports = Numbers;
