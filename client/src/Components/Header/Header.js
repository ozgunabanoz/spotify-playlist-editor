import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <nav className="navClass">
        <div className="nav-wrapper grey darken-4 headerBody">
          <Link to="/" className="brand-logo center">
            SpotifyEditor
          </Link>
        </div>
      </nav>
    );
  }
}

export default Header;
