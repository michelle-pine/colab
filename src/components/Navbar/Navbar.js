import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.scss';
import { Link, NavLink } from 'react-router-dom';
import store from '../../store/index';
import { connect } from 'react-redux';
import { registerUser } from "../../actions/index";
import { cookieUtils } from "../../utils/cookie_utils"



class Navbar extends React.Component {
  isActive(match, location) {
    if (!match) {
      return false;
    }

    return match.url === "/";
  }

  logout() {
    cookieUtils.deleteUserCookieData();
    store.dispatch(registerUser({loggedIn: false}));
  }

  render() {
    if (!this.props.isLoggedIn) {
      return null;
    }
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
              <Link onClick={this.logout} className="nav-link" to="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

function navbarMapStateToProps(state, ownProps) {
  return {
      isLoggedIn: state.user.loggedIn,
  };
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default connect(navbarMapStateToProps)(Navbar);
