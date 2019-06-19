require('request');
const rp = require('request-promise');

const base64Converter = () => {
    let data = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`;
    let buff = new Buffer(data);
    let base64data = buff.toString('base64'); // converting client_id:client_secret to base64

    return base64data;
};

const accessTokenCaller = async req => {
    try {
        // requesting access token from api
        let base64data = base64Converter();

        let accToken = await rp(
            // do this in an independent function
            {
                method: 'POST',
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    // using form object because body of the request should be encoded in 'application/x-www-form-urlencoded'
                    grant_type: 'refresh_token',
                    refresh_token: req.user.refresh_token
                },
                headers: {
                    Authorization: 'Basic ' + base64data,
                    Accept: 'application/json'
                }
            }
        )
            .then(body => {
                // retrieving access token from spotify api
                let json = JSON.parse(body);

                return json.access_token;
            })
            .catch(e => {
                console.log('error ' + e);

                return null;
            });

        return accToken;
    } catch (e) {
        console.log(e);
    }
};

const getAudioAnalysis = async (trackId, accToken) => {
    // for getting audio analysis for a specific track
    try {
        let audioAnalysis = await rp({
            method: 'GET',
            url: `https://api.spotify.com/v1/audio-features/${trackId}`,
            headers: {
                Authorization: `Bearer ${accToken}`,
                Accept: 'application/json'
            }
        })
            .then(response => {
                let data = JSON.parse(response);

                return data;
            })
            .catch(err => {
                console.log(err);
            });

        return audioAnalysis;
    } catch (e) {
        console.log(e);
    }
};

const playlistShuffler = playlist => {
    for (let i = playlist.length - 1; i > 0; i--) {
        // shuffler function
        const j = Math.floor(Math.random() * (i + 1));

        [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }

    return playlist;
};

const trackRemover = async (playlist, playlistId, accToken) => {
    try {
        let playlistArray = [];

        for (let i = 0; i < playlist.length; i++) {
            let elem = { uri: playlist[i].track.uri };

            playlistArray.push(elem);
        }

        await rp({
            method: 'DELETE',
            url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            body: { tracks: playlistArray },
            json: true,
            headers: {
                Authorization: `Bearer ${accToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });
    } catch (e) {
        console.log(e);
    }
};

const trackAdder = async (playlist, playlistId, accToken) => {
    try {
        let playlistArray = [];

        for (let i = 0; i < playlist.length; i++) {
            let elem = playlist[i].track.uri;

            playlistArray.push(elem);
        }

        await rp({
            method: 'POST',
            url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            body: { uris: playlistArray },
            json: true,
            headers: {
                Authorization: `Bearer ${accToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });
    } catch (e) {
        console.log(e);
    }
};

const sortPlaylistByBpmIncrease = async (playlist, accToken) => {
    try {
        for (let i = 0; i < playlist.length; i++) {
            playlist[i]['audio analysis'] = await getAudioAnalysis(
                playlist[i].track.id,
                accToken
            ); // getting audio analysis for every track and adding it as an object to the array element
        }

        playlist.sort(
            (a, b) => a['audio analysis'].tempo - b['audio analysis'].tempo // sort by increasing order
        );

        return playlist;
    } catch (e) {
        console.log(e);
    }
};

const sortPlaylistByBpmDecrease = async (playlist, accToken) => {
    try {
        for (let i = 0; i < playlist.length; i++) {
            playlist[i]['audio analysis'] = await getAudioAnalysis(
                playlist[i].track.id,
                accToken
            ); // getting audio analysis for every track and adding it as an object to the array element
        }

        playlist.sort(
            (a, b) => b['audio analysis'].tempo - a['audio analysis'].tempo // sort by decreasing order
        );

        return playlist;
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    accessTokenCaller,
    getAudioAnalysis,
    playlistShuffler,
    trackRemover,
    trackAdder,
    sortPlaylistByBpmIncrease,
    sortPlaylistByBpmDecrease
};
