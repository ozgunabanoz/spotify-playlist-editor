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

const getAudioAnalysis = async (playlist, accToken) => {
    try {
        let audioAnalysis = [];

        for (let i = 0; i < Math.ceil(playlist.length / 100); i++) {
            let ids = '';

            for (let j = 0; j < playlist.length; j++) {
                if (Math.floor(j / 100) === i) {
                    if (j + 1 === playlist.length) {
                        ids += playlist[j].track.id;
                    } else {
                        ids += playlist[j].track.id + ',';
                    }
                }
            }

            let response = await rp({
                method: 'GET',
                url: `https://api.spotify.com/v1/audio-features/?ids=${ids}`,
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

            for (let k = 0; k < response['audio_features'].length; k++) {
                audioAnalysis.push(response['audio_features'][k]);
            }
        }

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

        for (let i = 0; i < Math.ceil(playlistArray.length / 100); i++) {
            let tracksBatch = [];

            for (let j = 0; j < playlistArray.length; j++) {
                if (Math.floor(j / 100) === i) {
                    tracksBatch.push(playlistArray[j]);
                }
            }

            await rp({
                method: 'DELETE',
                url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                body: { tracks: tracksBatch },
                json: true,
                headers: {
                    Authorization: `Bearer ${accToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            });
        }
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

        for (let i = 0; i < Math.ceil(playlistArray.length / 100); i++) {
            let tracksBatch = [];

            for (let j = 0; j < playlistArray.length; j++) {
                if (Math.floor(j / 100) === i) {
                    tracksBatch.push(playlistArray[j]);
                }
            }

            await rp({
                method: 'POST',
                url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                body: { uris: tracksBatch },
                json: true,
                headers: {
                    Authorization: `Bearer ${accToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
};

const sortPlaylistByBpmIncrease = async (playlist, accToken) => {
    try {
        let playlistAudioFeatures = await getAudioAnalysis(playlist, accToken);

        for (let i = 0; i < playlist.length; i++) {
            playlist[i]['audio analysis'] = playlistAudioFeatures[i];
        }

        playlist.sort(
            (a, b) => a['audio analysis'].tempo - b['audio analysis'].tempo // sort by increasing order
        );

        for (let i = 0; i < playlist.length; i++) {
            console.log(
                `${i} ${playlist[i].track['artists'][0].name} ${
                    playlist[i].track.name
                } + ${playlist[i]['audio analysis'].tempo}`
            );
        }

        // fs.writeFileSync('deneme.json', JSON.stringify(playlist));

        return playlist;
    } catch (e) {
        console.log(e);
    }
};

const sortPlaylistByBpmDecrease = async (playlist, accToken) => {
    try {
        let playlistAudioFeatures = await getAudioAnalysis(playlist, accToken);

        for (let i = 0; i < playlist.length; i++) {
            playlist[i]['audio analysis'] = playlistAudioFeatures[i];
        }

        playlist.sort(
            (a, b) => b['audio analysis'].tempo - a['audio analysis'].tempo // sort by decreasing order
        );

        for (let i = 0; i < playlist.length; i++) {
            console.log(
                `${i} ${playlist[i].track['artists'][0].name} ${
                    playlist[i].track.name
                } + ${playlist[i]['audio analysis'].tempo}`
            );
        }

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
