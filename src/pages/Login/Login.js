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
        frontend: elements["frontend"].checked,
        backend: elements["backend"].checked,
        design: elements["design"].checked,
        business: elements["business"].checked,
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
                  <label htmlFor="user-first-name">First Name</label>
                  <input name="firstname" type="text" className="form-control" id="user-first-name" />
                </div>
                <div className="col-6">
                  <label htmlFor="user-last-name">Last Name</label>
                  <input name="lastname" type="text" className="form-control" id="user-last-name" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="user-email">Email address</label>
                <input name="email" type="email" className="form-control" id="user-email" placeholder="name@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="user-password">Password</label>
                <input name="password" type="password" className={`form-control ${this.state.showError ? "errored" : ""}`} id="user-password"/>
              </div>
              <div className="form-group">
                <label htmlFor="user-password-confirm">Confirm Password</label>
                <input name="password-confirm" type="password" className={`form-control ${this.state.showError ? "errored" : ""}`} id="user-password-confirm"/>
              </div>
              {this.state.showError ? error : null}
              <fieldset className="experience">
                <legend>I have experience in:</legend>
                <div className="form-check">
                  <input className="form-check-input" id="frontend" type="checkbox" name="past-experience"/>
                  <label className="form-check-label" htmlFor="frontend">Front-End Development</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" id="backend" type="checkbox" name="past-experience"/>
                  <label className="form-check-label" htmlFor="backend">Back-End Development</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input"  id="design" type="checkbox" name="past-experience"/>
                  <label className="form-check-label" htmlFor="design">Design</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" id="business" type="checkbox" name="past-experience"/>
                  <label className="form-check-label" htmlFor="business">Business</label>
                </div>
              </fieldset>   
    
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
