const passport = require('passport');
const request = require('request');
const rp = require('request-promise');
const _ = require('lodash');

let {
    accessTokenCaller,
    getAudioAnalysis,
    playlistShuffler,
    trackRemover,
    trackAdder,
    sortPlaylistByBpmIncrease,
    sortPlaylistByBpmDecrease
} = require('./../helpler_functions/functions');
let checkAuth = require('./../middleware/checkAuth');

module.exports = app => {
    app.get('/api/playlists', checkAuth, async (req, res) => {
        try {
            let accToken = await accessTokenCaller(req);

            let playlists = await rp({
                // retrieving playlists
                method: 'GET',
                url: 'https://api.spotify.com/v1/me/playlists',
                headers: {
                    Authorization: 'Bearer ' + accToken,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(body => {
                    let json = JSON.parse(body); // playlist object from api in json format

                    return json.items;
                })
                .catch(err => {
                    console.log(err);
                });

            res.send(playlists);
        } catch (e) {
            console.log(e);
        }
    });

    app.get('/api/playlists/get_tracks', checkAuth, async (req, res) => {
        try {
            // spotify api sends 100 tracks at a time
            // because of that, we make several requests to the api
            // and then add all the tracks to tracks array
            let accToken = await accessTokenCaller(req);
            let playlistId = req.query.playlistId;
            let numOfTracks = req.query.numOfTracks;
            let trackNumCeiling = Math.ceil(numOfTracks / 100);
            let tracks = [];

            for (let i = 0; i < trackNumCeiling; i++) {
                let offset = i * 100;

                await rp({
                    method: 'GET',
                    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks/?offset=${offset}`,
                    headers: {
                        Authorization: `Bearer ${accToken}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(async body => {
                        try {
                            let json = JSON.parse(body);

                            for (let j = 0; j < json.items.length; j++) {
                                tracks.push(json.items[j]);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

            res.send(tracks);
        } catch (e) {
            console.log(e);
        }
    });

    app.post('/api/playlists/shuffle', checkAuth, (req, res) => {
        let playlist = playlistShuffler(req.body.playlist);

        res.send(playlist);
    });

    app.post('/api/playlists/initialize', checkAuth, async (req, res) => {
        try {
            let accToken = await accessTokenCaller(req);

            await trackRemover(
                req.body.playlist,
                req.body.playlistId,
                accToken
            );

            await trackAdder(req.body.playlist, req.body.playlistId, accToken);

            res.send().status(200); // make redirecting to main page after the process is finished
        } catch (e) {
            console.log(e);
        }
    });

    app.post('/api/playlists/sort_by_bpm_inc', checkAuth, async (req, res) => {
        try {
            let accToken = await accessTokenCaller(req);
            let playlist = await sortPlaylistByBpmIncrease(
                req.body.playlist,
                accToken
            );

            res.send(playlist);
        } catch (e) {
            console.log(e);
        }
    });

    app.post('/api/playlists/sort_by_bpm_dec', checkAuth, async (req, res) => {
        try {
            let accToken = await accessTokenCaller(req);
            let playlist = await sortPlaylistByBpmDecrease(
                req.body.playlist,
                accToken
            );

            res.send(playlist);
        } catch (e) {
            console.log(e);
        }
    });
};
