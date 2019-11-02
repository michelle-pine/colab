import React from 'react';
import PropTypes from 'prop-types';
import './AllProjects.scss';
import Login from '../Login/Login';
import { withRouter } from "react-router-dom";


//stores
import store from '../../store/index';

class AllProjects extends React.Component {
  render() {
    if (!store.getState().user.loggedIn) {
      this.props.history.push("/login");
    }
    return (
      <div className="all-projects">
        <div className="sidebar">
          <div className="sidebar-box">
            <h1>All Projects</h1>
          </div>
        </div>
        <div className="projects-container">
          <div className="sample-card">DELETE THIS LATER</div>
        </div>
      </div>
    );
  }
};

AllProjects.defaultProps = {

};

AllProjects.propTypes = {

};

export default withRouter(AllProjects);
