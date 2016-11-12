function wait(seconds, callback) {
  setTimeout(() => {
    callback(new Date()); // <-- this is actually the function call
  }, seconds * 1000);     // <-- second parameter of setTimeout function, seconds arg * 1000 ms
}

console.log('console log BEFORE calling wait:', new Date());

wait(3, date => {   // <-- callback function declaration with 'date' as parameter
  console.log('Console log inside 1st callback:', date);
  wait(1, date => {
    console.log('Console log inside 2nd callback:', date);
    wait(1, date => {
      console.log('console log inside 3rd callback:', date);
    });
  });
});

// This console log will be called before the calls inside the wait functions
console.log('Console log AFTER calling wait:', new Date());
