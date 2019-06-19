import axios from 'axios';

import * as actionTypes from './actionTypes';

export const getPlaylists = () => {
    return async dispatch => {
        try {
            let data = await axios.get('/api/playlists');

            dispatch(getPlaylistDispatch(data.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const getPlaylistDispatch = playlists => {
    return {
        type: actionTypes.GET_PLAYLISTS,
        playlists: playlists
    };
};

export const getPlaylistTracks = (numOfTracks, playlistId) => {
    return async dispatch => {
        try {
            let data = await axios.get('/api/playlists/get_tracks', {
                params: {
                    // making a get request to api with parameters
                    numOfTracks,
                    playlistId
                }
            });

            dispatch(getPlaylistTracksDispatch(data.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const getPlaylistTracksDispatch = tracks => {
    return {
        type: actionTypes.GET_PLAYLIST_TRACKS,
        tracks: tracks
    };
};

export const clickPlaylist = clickedPlaylist => {
    return {
        type: actionTypes.CLICK_PLAYLIST,
        clickedPlaylist: clickedPlaylist
    };
};

export const setTracksNull = () => {
    return {
        type: actionTypes.SET_TRACKS_NULL,
        tracks: null
    };
};

export const setClickedPlaylistNull = () => {
    return {
        type: actionTypes.SET_CLICKED_PLAYLIST_NULL,
        clickedPlaylist: null
    };
};

export const shufflePlaylist = playlist => {
    return async dispatch => {
        try {
            let data = await axios.post('/api/playlists/shuffle', {
                playlist: playlist
            });

            dispatch(processInit(data.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const processInit = processedPlaylist => {
    return {
        type: actionTypes.PROC_PLAYLIST_INIT,
        processedPlaylist: processedPlaylist
    };
};

export const sendPlaylist = (playlist, playlistId) => {
    return async dispatch => {
        await axios.post('/api/playlists/initialize', {
            playlist: playlist,
            playlistId: playlistId
        });

        dispatch(setProcPlaylistNull());
    };
};

export const setProcPlaylistNull = () => {
    return {
        type: actionTypes.SET_PROCESSED_PLAYLIST_NULL,
        processedPlaylist: null
    };
};

export const sortPlByBpmInc = playlist => {
    return async dispatch => {
        try {
            let data = await axios.post('/api/playlists/sort_by_bpm_inc', {
                playlist: playlist
            });

            dispatch(processInit(data.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const sortPlByBpmDec = playlist => {
    return async dispatch => {
        try {
            let data = await axios.post('/api/playlists/sort_by_bpm_dec', {
                playlist: playlist
            });

            dispatch(processInit(data.data));
        } catch (e) {
            console.log(e);
        }
    };
};
