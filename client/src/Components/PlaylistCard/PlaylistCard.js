import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './../../store/actions/index';
import './PlaylistCard.css';

class PlaylistCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="row">
          <h5>{this.props.playlist.name}</h5>
        </div>
        <div className="row sec">
          <iframe
            src={
              'https://open.spotify.com/embed/playlist/' +
              this.props.playlist.id
            }
            title={this.props.playlist.id}
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
            className="spotifyPlayer"
          />
        </div>
        <div className="row">
          <button
            className="editButton"
            onClick={() => {
              this.props.onClickPlaylist(this.props.playlist); // when click, send the selected playlist to redux store
            }}
          >
            <NavLink className="navLink" to="/edit">
              Edit Playlist
            </NavLink>
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClickPlaylist: playlist =>
      dispatch(actions.clickPlaylist(playlist))
  };
};

export default connect(null, mapDispatchToProps)(PlaylistCard);
