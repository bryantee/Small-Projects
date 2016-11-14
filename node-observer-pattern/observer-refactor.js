// must use 'events' from 'events' syntax to make use of object
import events from "events";

const player = new events.EventEmitter();

// artist and song are forwarded to callback / listener
player.on('start', (artist, song) => {
  console.log(`Starting audo stream playing: ${artist} - ${song}`);
});

player.on('stop', () => {
  console.log('Stopping audio stream');
});

// second listener to 'start' event / state
player.on('start', () => {
  console.log('Updating UI to started state');
});

// second listener to 'stop' event / state
player.on('stop', () => {
  console.log('Updating UI to stopped state');
});

// Let's start and stop a few songs
player.emit('start', 'Sleater Kinney', 'No Cities to love');
player.emit('stop');
player.emit('start', 'Black Flag', 'Rise Above');
player.emit('stop');
