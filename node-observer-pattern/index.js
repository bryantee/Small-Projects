// new constructor function
const MusicPlayer = function() {
  this.listeners = {};
};

// add .on method -- does this need to inherit emitter prototype?
// takes eventName and listener as arguments
// ie. Player.on('pause', ?callback?)
MusicPlayer.prototype.on = function(eventName, listener) {
  // check if event exists, if not let's create it
  // and add listener
  if (!this.listeners.hasOwnProperty(eventName)) {
    this.listeners[eventName] = [listener];
  } else {
    this.listeners[eventName].push(listener);
  }
};

// add .emit method
// What are other args that can be passed?
// objects? Like {track: nextTrack()} or something?
// Args are forwarded to listeners object?
MusicPlayer.prototype.emit = function(eventName) {
  if (!this.listeners.hasOwnProperty(eventName)) {
    return;
  }

  let args = [];
  // loop through arguments and add push to args array
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  // WHY bind null to 'this' in listener function?
  // Does this apply each argument to the function? Bake it in?
  this.listeners[eventName].forEach( listener => {
    listener.apply(null, args);
  });
};

const player = new MusicPlayer();

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
