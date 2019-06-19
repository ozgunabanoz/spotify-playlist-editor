const passport = require('passport');
const request = require('request');

let { accessTokenCaller } = require('./../helpler_functions/functions');

module.exports = app => {
    app.get(
        '/auth/spotify',
        passport.authenticate('spotify', {
            scope: [
                'user-read-email',
                'user-read-private',
                'playlist-modify-public',
                'user-read-recently-played'
            ]
        }),
        (req, res) => {} // this part is empty because it is handled by spotify
    );

    app.get(
        '/auth/spotify/callback',
        passport.authenticate('spotify'),
        (req, res) => {
            res.redirect('/'); // redirect to main page after authentication
        }
    );

    app.get('/api/current_user', async (req, res) => {
        try {
            if (!req.user) {
                // check if a user already exists as a session
                res.send(null); // if not, send null to the client
            } else {
                let accToken = await accessTokenCaller(req); // get access token

                if (accToken !== null) {
                    // if access token isn't null, send it to client
                    res.send(req.user);
                } else {
                    // if null, logout
                    req.logout();
                    res.send(req.user);
                    res.redirect('/');
                }
            }
        } catch (e) {
            console.log(e);
        }
    });
};
