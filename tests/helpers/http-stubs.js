let headers = { 'Content-Type': 'application/vnd.api+json' };

function songsUrlForBand(id) {
  return '/bands/' + id + '/songs';
}

function responseItemForBand(data, id) {
  let bandId = id || data.id;
  return {
    id: bandId,
    type: 'bands',
    attributes: data.attributes,
    relationships: {
      songs: {
        links: {
          related: songsUrlForBand(bandId)
        }
      }
    }
  }
}

function responseItemForSong(data, id) {
  let songId = id || data.id;
  return {
    id: songId,
    type: 'songs',
    attributes: data.attributes
  };
}

export default {
  stubBands: function(pretender, data) {
    let responseForBands = [];
    data.forEach(function(band) {
      let responseForBand = responseItemForBand(band);
      pretender.get('/bands/' + responseForBand.id, function() {
        return [ 200, headers, JSON.stringify({ data: responseForBand }) ];
      });
      responseForBands.push(responseForBand);
    });
    pretender.get('/bands', function() {
      return [ 200, headers, JSON.stringify({ data: responseForBands }) ];
    });
  },

  stubSongs: function(pretender, bandId, data) {
    let response = data.map(function(song) {
      return responseItemForSong(song);
    });
    pretender.get(songsUrlForBand(bandId), function() {
      return [ 200, headers, JSON.stringify({ data: response }) ];
    });
  },

  stubCreateBand: function(pretender, newId) {
    pretender.post('/bands', function(request) {
      let response = responseItemForBand(JSON.parse(request.requestBody).data, newId);
      return [ 200, headers, JSON.stringify({ data: response }) ];
    });
  },

  stubCreateSong: function(pretender, newId) {
    pretender.post('/songs', function(request) {
      let response = responseItemForSong(JSON.parse(request.requestBody).data, newId);
      return [ 200, headers, JSON.stringify({ data: response }) ];
    });
  }
}