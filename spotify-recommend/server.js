'use strict';

import unirest from 'unirest';
import express from 'express';
import events from 'events';

const app = express();
app.use(express.static('public'));

const getFromApi = function(endpoint, args) {
  let emitter = new events.EventEmitter();
  unirest.get('https://api.spotify.com/v1/' + endpoint)
    .qs(args) // option to append query strings to url
    .end( response => {
      if (response.ok) {
        emitter.emit('end', response.body);
      }
      else {
        emitter.emit('error', response.code);
      }
    });
    return emitter;
};

app.get('/search/:name', (req, res) => {
  let searchReq = getFromApi('search', {
    q: req.params.name,
    limit: 1,
    type: 'artist'
  });

  searchReq.on('end', item => {
    let artist = item.artists.items[0];
    res.json(artist);
  });

  searchReq.on('error', code => {
    res.sendStatus(code);
  });
});

app.listen(process.env.PORT || 8080);
