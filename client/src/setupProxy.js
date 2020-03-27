const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/auth/spotify', { target: 'http://localhost:5000' })
  );
  app.use(
    proxy('/api/current_user', { target: 'http://localhost:5000' })
  );
  app.use(
    proxy('/api/playlists', { target: 'http://localhost:5000' })
  );
  app.use(
    proxy('/api/playlists/get_tracks', {
      target: 'http://localhost:5000'
    })
  );
  app.use(
    proxy('/api/playlists/shuffle', {
      target: 'http://localhost:5000'
    })
  );
  app.use(
    proxy('/api/playlists/initialize', {
      target: 'http://localhost:5000'
    })
  );
  app.use(
    proxy('/api/playlists/sort_by_bpm_inc', {
      target: 'http://localhost:5000'
    })
  );
  app.use(
    proxy('/api/playlists/sort_by_bpm_dec', {
      target: 'http://localhost:5000'
    })
  );
};
