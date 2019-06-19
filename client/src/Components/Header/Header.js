import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
    render() {
        return (
            <nav className="navClass">
                <div className="nav-wrapper grey darken-4 headerBody">
                    <a href="/" className="brand-logo center">
                        SpotifyApp
                    </a>
                </div>
            </nav>
        );
    }
}

export default Header;
