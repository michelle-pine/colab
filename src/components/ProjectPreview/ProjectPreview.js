import React from "react";
import PropTypes from "prop-types";
import "./ProjectPreview.scss";
import { Link } from 'react-router-dom';

import TimeAgo from 'javascript-time-ago'
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)

const ProjectPreview = props => {
  const timeAgo = new TimeAgo('en-US')

  return (
    <Link
      className="project-item-container"
      to={`/projects/${props.project.id}`}
    >
      <h4>{props.project.projectName}</h4>
      <p>
        created by {" "}
        {props.project.projectCreator}
      </p>
      <p className="time-created">{timeAgo.format(props.project.timeCreated)}</p>
    </Link>
  );
};


ProjectPreview.defaultProps = {};

ProjectPreview.propTypes = {};

export default ProjectPreview;
