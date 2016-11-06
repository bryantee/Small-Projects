const fs = require('fs');

let readableStream = fs.createReadStream('test.txt');
let writeableStream = fs.createWriteStream('out.txt');

readableStream.pipe(writeableStream);


