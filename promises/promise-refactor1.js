'use strict';

function wait(seconds) {
  return new Promise(resolve => {
    console.log('setTimeout');
    setTimeout(() => {
      resolve(new Date()); // <-- function call turns into resolve
    }, seconds * 1000);     // <-- second parameter of setTimeout function, seconds arg * 1000 ms
  });
}

console.log('console log BEFORE calling wait:', new Date());

var wait1 = wait(1)
console.log('Then')
wait1.then( date => {
  console.log('Console log after 1st promise', date);
  return wait(1);
}).then( date => {
  console.log('Console log after 2nd promise', date);
  return wait(1);
}).then( date => {
  console.log('Console log after 3nd promise', date);
}).catch( () => {
  console.log(`Error: ${error}`);
});

// This console log will be called before the calls inside the wait functions
console.log('Console log AFTER calling wait:', new Date());
