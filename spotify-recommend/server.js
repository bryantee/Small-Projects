// TODO: Remove console logs after development complete

'use strict';

import unirest from 'unirest';
import express from 'express';
import events from 'events';

const app = express();
app.use(express.static('public'));

// function returns emitter object with hardcoded unirest url
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

// app route called from front end of app
app.get('/search/:name', (req, res) => {
  let searchReq = getFromApi('search', {
    q: req.params.name,
    limit: 1,
    type: 'artist'
  });

  // .on(end) listener starts flow of stream? Making FIRST API request?
  searchReq.on('end', item => {
    let artist = item.artists.items[0];
    // if artist.name is undefined, fatal error
    // TODO: Need to find way to handle errors properly
    console.log(`Artist: ${artist.name}`);
    let endpoint = 'artists/' + artist.id + '/related-artists';
    console.log(`Endpoint: ${endpoint}`);
    // setup new emitter object for to get related artists
    let searchRelated = getFromApi(endpoint);
    // making SECOND API request
    searchRelated.on('end', item => {
      if (artist.name) {
        console.log(`searchRelated called with: ${artist.name}`)
      } else {
        console.log('No response for artist.');
      }
      // add new property for 'related' which will be an array
      // return entire artist object
      artist.related = item.artists;

      let artistTopTrackCount = 0;

      // initiate calls for top tracks for each artist
      function getTopTracks(relatedArtist) {

        // Must setup new emitter object for each artist
        const topTracksReq = getFromApi('artists/' + relatedArtist.id + '/top-tracks', {country: 'US'});

        // setting up listener for on end
        // sets tracks property on each related artist
        topTracksReq.on('end', item => {
          let tracks = item.tracks;
          for (var i = 0; i < artist.related.length; i++) {
            if (artist.related[i].name === relatedArtist.name) {
              artist.related[i].tracks = tracks;
            }
          }
          console.log(`Received top tracks for ${relatedArtist.name}`);
          artistTopTrackCount++

          // Check for all requests to come back
          // When they're all back, return the artist object
          console.log(artistTopTrackCount);
          if (artistTopTrackCount === artist.related.length) {
            console.log(`Received all ${artist.related.length} responses.`);
            res.json(artist);
          }
        });

        topTracksReq.on('error', code => {
          console.log(`Error: ${code}`);
          artistTopTrackCount++;
          if (artistTopTrackCount === artist.related.length) {
            console.log(`Received all ${artist.related.length} responses.`);
            res.json(artist);
          }
        });
      }

      // iterate through the related artists array
      // Call getTopTracks for each in async fashion
      artist.related.forEach( (relatedArtist, index) => {
        console.log(relatedArtist.name);
        getTopTracks(relatedArtist);
      });

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
