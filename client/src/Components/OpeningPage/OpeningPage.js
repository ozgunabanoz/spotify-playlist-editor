import React, { Component } from 'react';

import './OpeningPage.css';

class OpeningPage extends Component {
    render() {
        return (
            <div className="openingPageBody">
                <div>
                    <h5>Welcome to Personal Spotify App</h5>
                </div>
                <div className="buttonDiv">
                    <button className="loginButton">
                        <a className="navLink" href="/auth/spotify">
                            Login
                        </a>
                    </button>
                </div>
            </div>
        );
    }
}

export default OpeningPage;
