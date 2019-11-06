import React from "react";
import PropTypes from "prop-types";
import "./ProjectPreview.scss";

const ProjectPreview = props => {
  return (
    <div
      className="project-item-container"
      onClick={() => handleProjectClicked(props.project)}
    >
      <h4>{props.project.projectName}</h4>
      <p>
        created by {" "}
        {props.project.projectCreator}
      </p>
      <p>{props.project.timeCreated}</p>
    </div>
  );
};

function handleProjectClicked(project) {
  // open project page
}

function handleProfileClicked(profile) {
  // open profile page
}

ProjectPreview.defaultProps = {};

ProjectPreview.propTypes = {};

export default ProjectPreview;
