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
    console.log(`Artist: ${artist.name}`);
    let endpoint = 'artists/' + artist.id + '/related-artists';
    console.log(`Endpoint: ${endpoint}`);
    // setup new emitter object
    let searchRelated = getFromApi(endpoint);
    searchRelated.on('end', item => {
      if (artist.name) {
        console.log(`searchRelated called with: ${artist.name}`)
      } else {
        console.log('No response for artist.');
      }
      // add new property for 'related' which will be an array

      artist.related = item.artists;
      res.json(artist);
    })
    // NOTE: response.code passed as argument to 'error' event if response.ok != true
    searchRelated.on('error', code => {
      console.log(`Error, status code: ${code}`);
      res.sendStatus(code);
    });
  });

  searchReq.on('error', code => {
    res.sendStatus(code);
  });
});

app.listen(process.env.PORT || 8080);
