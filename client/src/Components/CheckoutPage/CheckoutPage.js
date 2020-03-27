import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from './../../store/actions/index';
import Loader from './../Loader/Loader';
import './CheckoutPage.css';

class CheckoutPage extends Component {
  state = {
    playlistId: null
  };

  componentDidMount = () => {
    let { playlistId } = this.props.location.state;

    this.setState({ playlistId: playlistId });
  };

  renderSongs = playlist => {
    try {
      return _.map(playlist, track => {
        return (
          <li key={track.track.id}>
            <a href={track.track.external_urls.spotify}>
              {track.track.artists[0].name} - {track.track.name}
            </a>
          </li>
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  sendPlaylistInit = () => {
    this.props.onSendPlaylist(
      this.props.processedPlaylist,
      this.state.playlistId
    );
  };

  render() {
    return (
      <div className="checkoutPageBody">
        <div className="row">
          <h5>New tracklist: </h5>
        </div>
        <div className="row">
          <div className="playlistScrollable">
            {this.props.processedPlaylist ? (
              <ul>
                {this.renderSongs(this.props.processedPlaylist)}
              </ul>
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <div className="row btnsRow">
          <div className="column checkoutColumn">
            <button className="checkOutButtons">
              <NavLink to="/edit" className="navLink">
                <i className="material-icons">close</i>
              </NavLink>
            </button>
          </div>
          <div className="column checkoutColumn">
            <button
              className="checkOutButtons"
              onClick={() => this.sendPlaylistInit()}
            >
              <NavLink to="/" className="navLink">
                <i className="material-icons">done</i>
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    processedPlaylist: state.playlistStore.processedPlaylist
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    onSendPlaylist: (playlist, playlistId) =>
      dispatch(actions.sendPlaylist(playlist, playlistId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(CheckoutPage);
