import React from 'react';
import PropTypes from 'prop-types';
import './ProjectCard.scss';
import Tag from '../Tag/Tag';
import { Link } from 'react-router-dom';


class ProjectCard extends React.Component {
  renderTags() {
    let tags = this.props.project.tagsRich;
    let renderedTags = [];
    for (let tag of tags) {
      renderedTags.push(
        <Tag tag={tag} />
      )
    }
    return renderedTags;
  }
  
  render() {
    return (
      <div className="project-card">
        <div className="project-card-top-info">
          <Link to={`/projects/${this.props.projectId}`} className="project-card-name">
            {this.props.project.name}
          </Link>
          <div className="project-card-button-container">
            <Link to={`/projects/${this.props.projectId}`} className="project-card-button">
              More Info
            </Link>
          </div>
        </div>
        <div className="project-card-author">
          by {this.props.project.author.firstname} {this.props.project.author.lastname}
        </div>
        <div className="project-card-description">
          {this.props.project.description}
        </div>
        <div className="project-card-tags">
          {this.renderTags()}
        </div>
      </div>
    );
  }
}

ProjectCard.defaultProps = {
  project: PropTypes.object,
  projectId: PropTypes.number,
};

export default ProjectCard;
