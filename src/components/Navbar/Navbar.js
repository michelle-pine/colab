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
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">CoLab</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa fa-bars"></i>
        </button>

        <div className="collapse nav-link-group navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink activeClassName="active" isActive={this.isActive} className="nav-link" to="/">All Projects</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/create-project">Create Project</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/my-profile">My Profile</NavLink>
            </li>
            <li className="nav-item">
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
