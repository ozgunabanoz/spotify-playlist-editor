import * as actionTypes from './../actions/actionTypes';

const initialState = {
  playlists: null,
  tracks: null,
  clickedPlaylist: null,
  processedPlaylist: null
};

const getPlaylists = (state, action) => {
  return {
    ...state,
    playlists: action.playlists
  };
};

const getPlaylistTracks = (state, action) => {
  return {
    ...state,
    tracks: action.tracks
  };
};

const clickPlaylist = (state, action) => {
  return {
    ...state,
    clickedPlaylist: action.clickedPlaylist
  };
};

const setTracksNull = (state, action) => {
  return {
    ...state,
    tracks: action.tracks
  };
};

const setClickedPlaylistNull = (state, action) => {
  return {
    ...state,
    clickedPlaylist: action.clickedPlaylist
  };
};

const procPlaylistInit = (state, action) => {
  return {
    ...state,
    processedPlaylist: action.processedPlaylist
  };
};

const setProcPlaylistNull = (state, action) => {
  return {
    ...state,
    processedPlaylist: action.processedPlaylist
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PLAYLISTS:
      return getPlaylists(state, action);
    case actionTypes.GET_PLAYLIST_TRACKS:
      return getPlaylistTracks(state, action);
    case actionTypes.CLICK_PLAYLIST:
      return clickPlaylist(state, action);
    case actionTypes.SET_TRACKS_NULL:
      return setTracksNull(state, action);
    case actionTypes.SET_CLICKED_PLAYLIST_NULL:
      return setClickedPlaylistNull(state, action);
    case actionTypes.PROC_PLAYLIST_INIT:
      return procPlaylistInit(state, action);
    case actionTypes.SET_PROCESSED_PLAYLIST_NULL:
      return setProcPlaylistNull(state, action);
    default:
      return state;
  }
};

export default reducer;
