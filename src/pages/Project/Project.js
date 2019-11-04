import React from 'react';
import PropTypes from 'prop-types';
import './Project.scss';
import store from '../../store/index';


class Project extends React.Component {

  getProject() {
    const { id } = this.props.match.params;
    let projects = store.getState().projects;
    return projects[id];
  }

  render() {
    let project = this.getProject();
    return (
      <div>
        {project.name}
      </div>
    );
  }
};


export default Project;
