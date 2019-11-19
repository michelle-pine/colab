import React from "react";
import PropTypes from "prop-types";
import "./ProjectCard.scss";
import Tag from "../Tag/Tag";
import { Link } from "react-router-dom";
import TimeAgo from "javascript-time-ago";
// Load locale-specific relative date/time formatting rules.
import en from "javascript-time-ago/locale/en";
import store from "../../store/index";

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);

class ProjectCard extends React.Component {
  renderTags() {
    let tags = this.props.project.tagsRich;
    const order = {
      Positions: 0,
      Languages: 1,
      Technologies: 2,
      Topics: 3,
      Difficulty: 4
    };
    let renderedTags = [];
    tags = tags.sort((a, b) => (order[a.type] < order[b.type] ? -1 : 1));
    for (let tag of tags) {
      renderedTags.push(<Tag tag={tag} key={tag.id} />);
    }
    return renderedTags;
  }

  filterById(arr, id) {
    return arr.filter(a => a.projectId === `${id}`).length > 0;
  }

  partOfProject(user) {
    const projs = user.myProjects;
    const id = this.props.projectId;
    return this.filterById(projs.current, id) || this.filterById(projs.past, id) || this.filterById(projs.pending, id);
  }
  
  renderProjectStatus() {
    const state = store.getState();
    const user = state.user;
    if (this.props.project.creatorId === 999) {
      return "MY PROJECT";
    } else if (user.myProjects && this.partOfProject(user)) {
      return "APPLIED";
    }
  }

  render() {
    const timeAgo = new TimeAgo("en-US");

    return (
      <div className="project-card">
        <div className="project-card-top-info">
          <Link
            to={`/projects/${this.props.projectId}?goback=true`}
            className="project-card-name"
          >
            {this.props.project.name}
            {this.props.project.creatorId === 999 ? (
              <Link id="edit-link" to={`/edit-project/${this.props.projectId}`}>
                Edit
              </Link>
            ) : null}
            <div className="project-status">{this.renderProjectStatus()}</div>
          </Link>
          <div className="project-card-button-container">
            <Link
              to={`/projects/${this.props.projectId}?goback=true`}
              className="project-card-button"
            >
              More Info
            </Link>
          </div>
        </div>
        <div className="project-card-author">
          by {this.props.project.author.firstname}{" "}
          {this.props.project.author.lastname}
          <span className="project-card-timestamp">
            {timeAgo.format(this.props.project.createdAt)}
          </span>
        </div>
        <div className="project-card-description">
          {this.props.project.description}
        </div>
        <div className="project-card-tags">{this.renderTags()}</div>
      </div>
    );
  }
}

ProjectCard.defaultProps = {
  project: PropTypes.object,
  projectId: PropTypes.number
};

export default ProjectCard;
