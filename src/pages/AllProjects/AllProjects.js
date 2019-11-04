import React from 'react';
import PropTypes from 'prop-types';
import './AllProjects.scss';
import { withRouter } from "react-router-dom";

//stores
import store from '../../store/index';

//utils
import { projectUtils } from '../../utils/project_utils';

//components
import ProjectCard from '../../components/ProjectCard/ProjectCard'

class AllProjects extends React.Component {
  renderProjects() {
    let projects = store.getState().projects;
    let renderedProjects = [];
    for (let i in projects) {
      let curProject = projectUtils.convertProject(projects[i]);
      renderedProjects.push(
        <ProjectCard key={i} projectId={i} project={curProject} />
      );
    }
    return renderedProjects;
  }
  
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
          {this.renderProjects()};
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
