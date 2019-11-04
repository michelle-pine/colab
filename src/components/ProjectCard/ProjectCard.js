import React from 'react';
import PropTypes from 'prop-types';
import './ProjectCard.scss';
import Tag from '../Tag/Tag';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago'
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)

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
    const timeAgo = new TimeAgo('en-US')

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
          <span className="project-card-timestamp">{timeAgo.format(this.props.project.createdAt)}</span>
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
