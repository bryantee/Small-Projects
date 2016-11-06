const fs = require('fs');
let readableStream = fs.createReadStream('test.txt');
let text = '';

readableStream.setEncoding('utf8');

readableStream.on('data', function(chunk) {
  text += chunk;
});

readableStream.on('end', function() {
  console.log(text);
});
