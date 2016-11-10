import {Transform} from 'stream';

export class SquareNumber extends Transform {
  constructor() {
    super();
  }
  _transform(chunk, encoding, callback) {
    chunk = Math.pow(parseInt(chunk), 2);
    this.push(chunk.toString());
    callback();
  }
}
