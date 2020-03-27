import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './../../store/actions/index';
import Loader from './../Loader/Loader';
import EditPlaylistCard from './../EditPlaylistCard/EditPlaylistCard';
import './EditPage.css';

class EditPage extends Component {
  componentDidMount() {
    // take it from here
    try {
      this.getPlaylistTracks(this.props.clickedPlaylist);
    } catch (e) {
      console.log(e);
    }
  }

  getPlaylistTracks = playlist => {
    let numOfTracks = playlist.tracks.total;
    let playlistId = playlist.id;

    this.props.onGetPlaylistTracks(numOfTracks, playlistId);
  };

  render() {
    let tracks = this.props.tracks;

    return (
      <div className="editPageBody">
        {tracks ? (
          <EditPlaylistCard
            playlist={{
              name: this.props.clickedPlaylist.name,
              id: this.props.clickedPlaylist.id,
              imgUrl: this.props.clickedPlaylist.images[0].url
            }}
            tracks={tracks}
          />
        ) : (
          <Loader />
        )}
        {/* if tracks are not loaded, display a loader */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetPlaylistTracks: (numOfTracks, playlistId) =>
      dispatch(actions.getPlaylistTracks(numOfTracks, playlistId))
  };
};

const mapStateToProps = state => {
  return {
    tracks: state.playlistStore.tracks,
    clickedPlaylist: state.playlistStore.clickedPlaylist
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
