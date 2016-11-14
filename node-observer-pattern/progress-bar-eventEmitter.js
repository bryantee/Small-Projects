import events from "events";

const progressBar = new events.EventEmitter();

progressBar.on('start', (processType) => {
  console.log(`${processType} starting...`);
});

progressBar.on('progress', (percent) => {
  console.log(`${percent}% complete`);
});

progressBar.on('complete', (processType) => {
  console.log(`${processType} complete!`);
});

for (var i = 1; i <= 100; i++) {
  if (i === 1) progressBar.emit('start', 'Download');
  if (i % 10 === 0) progressBar.emit('progress', i);
  if (i === 100) progressBar.emit('complete', 'Download');
}
