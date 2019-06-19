import React, { Component } from 'react';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './../../store/actions/index';
import './EditPlaylistCard.css';

class EditPlaylistCard extends Component {
    componentDidMount() {
        this.props.onSetProcessedPlaylistNull();
    }

    spotifyTrackPlayerFunc = () => {
        return _.map(this.props.tracks, track => {
            return (
                <li key={track.track.id}>
                    <a href={track.track.external_urls.spotify}>
                        {track.track.artists[0].name} - {track.track.name}
                    </a>
                </li>
            );
        });
    };

    render() {
        return (
            <div className="editPlaylistCard">
                <div className="row">
                    <h5>{this.props.playlist.name}</h5>
                </div>
                <div className="row">
                    <b>Here's tracklist:</b>
                </div>
                <div className="row">
                    <div className="playTracksScroll sec">
                        <ul>{this.spotifyTrackPlayerFunc()}</ul>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <button
                            className="editorButton tooltip"
                            onClick={
                                () =>
                                    this.props.onShufflePlaylist(
                                        this.props.tracks
                                    ) // send playlist to be shuffled
                            }
                        >
                            <NavLink
                                className="navLink"
                                to={{
                                    pathname: '/checkout',
                                    state: {
                                        playlistId: this.props.playlist.id
                                    }
                                }}
                            >
                                <i className="material-icons">shuffle</i>
                            </NavLink>
                            <span className="tooltiptext">Shuffle</span>
                        </button>
                    </div>
                    <div className="column">
                        <button
                            className="editorButton tooltip"
                            onClick={() =>
                                this.props.onSortPlByBpmInc(this.props.tracks)
                            }
                        >
                            <NavLink
                                className="navLink"
                                to={{
                                    pathname: '/checkout',
                                    state: {
                                        playlistId: this.props.playlist.id
                                    }
                                }}
                            >
                                <i className="material-icons">trending_up</i>
                            </NavLink>
                            <span className="tooltiptext">
                                Sort by BPM Increasing
                            </span>
                        </button>
                    </div>
                    <div className="column">
                        <button
                            className="editorButton tooltip"
                            onClick={() =>
                                this.props.onSortPlByBpmDec(this.props.tracks)
                            }
                        >
                            <NavLink
                                className="navLink"
                                to={{
                                    pathname: '/checkout',
                                    state: {
                                        playlistId: this.props.playlist.id
                                    }
                                }}
                            >
                                <i className="material-icons">trending_down</i>
                            </NavLink>
                            <span className="tooltiptext">
                                Sort by BPM Decreasing
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShufflePlaylist: playlist =>
            dispatch(actions.shufflePlaylist(playlist)),
        onSetProcessedPlaylistNull: () =>
            dispatch(actions.setProcPlaylistNull()),
        onSortPlByBpmInc: playlist =>
            dispatch(actions.sortPlByBpmInc(playlist)),
        onSortPlByBpmDec: playlist => dispatch(actions.sortPlByBpmDec(playlist))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EditPlaylistCard);
