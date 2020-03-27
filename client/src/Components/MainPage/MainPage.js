import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from './../../store/actions/index';
import PlaylistCard from './../PlaylistCard/PlaylistCard';
import './MainPage.css';

class MainPage extends Component {
  componentDidMount() {
    this.props.onGetPlaylists();
    this.props.onSetTracksNull();
    this.props.onSetClickedPlaylistNull();
    this.props.onSetProcessedPlaylistNull();
    // when mount, make clicked playlist and its respective tracks null
    // if not, it creates issues with edit page,
    // it shows previous selected playlists and tracks etc
  }

  fetchPlaylists = () => {
    // listing playlist names
    return _.map(this.props.playlists, playlist => {
      return <PlaylistCard key={playlist.id} playlist={playlist} />;
    });
  };

  render() {
    return (
      <div className="mainPageBody">
        <div className="greetingSection">
          <p>Hello there, {this.props.loggedUser.user_id}</p>
          <p>Here are all of your playlists: </p>
        </div>
        <div>{this.fetchPlaylists()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.authStore.user,
    playlists: state.playlistStore.playlists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPlaylists: () => dispatch(actions.getPlaylists()),
    onSetTracksNull: () => dispatch(actions.setTracksNull()),
    onSetClickedPlaylistNull: () =>
      dispatch(actions.setClickedPlaylistNull()),
    onSetProcessedPlaylistNull: () =>
      dispatch(actions.setProcPlaylistNull())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
