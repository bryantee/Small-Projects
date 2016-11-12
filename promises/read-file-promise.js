'use strict';

const fs = require('fs');

const getText = function(file) {
  console.log('Calling get text')
  return new Promise( (resolve, reject) => {
    fs.readFile(file, (err, text) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      else {
        console.log(`text in getText function: ${text}`);
        resolve(text.toString());
      }
    });
  });
}

function transform(text) {
  console.log('transform Promise');
  return new Promise(resolve => {
    resolve(text);
  });
}

function writeFile(text) {
  return new Promise( resolve => {
    console.log('writeFile Promise');
    fs.writeFile('out.txt', text, resolve);
  });
}

(async function() {
  console.log('starting async function');
  let text = await getText('testing.txt');
  console.log(`Text: ${text}`);
  let newText = await transform(text);
  let writeText = await writeFile(text);
}());

console.log('async done.');
