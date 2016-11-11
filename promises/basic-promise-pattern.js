'use strict';

let promise = new Promise( resolve => {
  resolve("SUCCESS");
});

console.log('Console log BEFORE promise.');

promise.then(result => {
  console.log(result + ' 1');
  return result;
}).then(result => {
  console.log(result + ' 2');
  return result;
}).then(result => {
  console.log(result + ' 3');
}).catch(error => {
  console.log(`Error: ${error}`);
})

console.log('Console log AFTER promise.');
