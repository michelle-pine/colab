import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends React.Component {
  isActive(match, location) {
    if (!match) {
      return false;
    }

    return match.url === "/";
  }

  render() {
    return (
      <nav className="nav-bar">
        <div className="nav-logo">
          <Link className="nav-logo-link" to="/">CoLab</Link>
        </div>
        <div className="nav-link-group">
          <ul className="nav-links list-unstyled">
            <li className="nav-link-wrapper">
              <NavLink activeClassName="active" isActive={this.isActive} className="nav-link" to="/">All Projects</NavLink>
            </li>
            <li className="nav-link-wrapper">
              <NavLink activeClassName="active" className="nav-link" to="/create-project">Create Project</NavLink>
            </li>
            <li className="nav-link-wrapper">
              <NavLink activeClassName="active" className="nav-link" to="/my-profile">My Profile</NavLink>
            </li>
            <li className="nav-link-wrapper">
              <Link className="nav-link" to="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

Navbar.defaultProps = {

};

Navbar.propTypes = {

};

export default Navbar;
