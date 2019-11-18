import React from 'react';
import PropTypes from 'prop-types';
import './Login.scss';

import store from '../../store/index';
import { registerUser } from "../../actions/index";
import { withRouter } from "react-router-dom";
import { cookieUtils } from "../../utils/cookie_utils"


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {username: null, password: null, firstName: null, lastName: null, roles: null, showError: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const elements = e.target.elements;
    if (elements["password"].value.length >= 8 && elements["password"].value === elements["password-confirm"].value) {
      const user = {
        username: elements["user-email"].value,
        firstname: elements["user-first-name"].value,
        lastname: elements["user-last-name"].value,
        loggedIn: true,
        myProjects: {
          current: [],
          pending: [],
          past: [],
        }
      }
      for (var item in user) {
        cookieUtils.bakeCookie(item, user[item]);
      }
      store.dispatch(registerUser(user));
      this.props.history.push("/");
    }
    else {
      this.setState({showError: true});
    }
  }

  render() {
    const error = <p className="error-message"><i className="fa fa-exclamation-circle"></i>&nbsp;Passwords Must Be at Least 8 Characters and Must Match </p>;
    return (
      <div className="login">
          <div className="login-box">
            <h1><span className="logo">CoLab</span> / Register</h1>
            <p>
              CoLab is an online software collaboration community for coders, designers, and business people with complementary skill sets. Register to use CoLab with your Northeastern credentials and start hacking!
            </p>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <div className="col-6">
                  <label htmlFor="user-first-name">First Name&nbsp;<i className="fa fa-asterisk required-icon"></i></label>
                  <input required name="firstname" type="text" className="form-control" id="user-first-name" />
                </div>
                <div className="col-6">
                  <label htmlFor="user-last-name">Last Name&nbsp;<i className="fa fa-asterisk required-icon"></i></label>
                  <input required name="lastname" type="text" className="form-control" id="user-last-name" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="user-email">Email address&nbsp;<i className="fa fa-asterisk required-icon"></i></label>
                <input name="email" type="email" className="form-control" id="user-email" placeholder="name@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="user-password">Password&nbsp;<i className="fa fa-asterisk required-icon"></i></label>
                <input name="password" type="password" className={`form-control ${this.state.showError ? "errored" : ""}`} id="user-password"/>
              </div>
              <div className="form-group">
                <label htmlFor="user-password-confirm">Confirm Password&nbsp;<i className="fa fa-asterisk required-icon"></i></label>
                <input name="password-confirm" type="password" className={`form-control ${this.state.showError ? "errored" : ""}`} id="user-password-confirm"/>
              </div>
              {this.state.showError ? error : null}
              <div className="form-group required-icon">
                <i className="fa fa-asterisk required-icon"></i>&nbsp;Required
              </div>
              <div className="form-group">
                <button type="submit" className="go-button">Register</button>
              </div>
            </form>
          </div>
      </div>
    );
  }
};

Login.defaultProps = {

};

Login.propTypes = {

};

export default withRouter(Login);
