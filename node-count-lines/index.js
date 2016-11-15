'use strict';

import fs from 'fs';
import path from 'path';
import events from 'events';

const countLines = function(file, callback) {
  let lines = 0;
  let reader = fs.createReadStream(file);
  reader.on('end', () => {
    callback(null, lines); // <-- why pass null as first parameter? Error-first callback, error explicit?
  });
  reader.on('data', data => {
    lines += data.toString().split('\n').length -1;
  });
  reader.on('error', err => {
    callback(err);
  });
};

const onReadDirComplete = function(err, files) {
  if (err) throw err;

  let totalLines = 0;
  let completed = 0;

  // function checks if all processes have finished counting lines (async)
  const checkComplete = function() {
    if (completed === files.length) {
      console.log(`TOTAL LINES${process.argv[2]}: ${totalLines}`);
    }
  }

  // iterate through each file in array and count lines
  // update totalLines and how many have finished
  // Once all are done, then we're finished
  files.forEach(function(file) {
    countLines(path.join(process.argv[2], file), (err, lines) => {
      if (err) {
        if (err.code === 'EISDIR') {
          // sub directory
        } else {
          console.error(err);
        }
      } else {
        totalLines += lines;
      }
      console.log(`File: ${file}, Lines: ${lines}`);
      completed += 1;
      checkComplete();
    });
  });
};

fs.readdir(process.argv[2], onReadDirComplete); // <-- does .readdir pass files into callback as args?
