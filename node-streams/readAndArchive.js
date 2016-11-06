const fs = require('fs');
const zlib = require('zlib');

let inFile = fs.createReadStream(process.argv[2]);
let outFile = fs.createWriteStream(process.argv[3]);

inFile.pipe(zlib.createGzip()).pipe(outFile);
