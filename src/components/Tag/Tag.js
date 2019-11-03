import React from 'react';
import PropTypes from 'prop-types';
import './Tag.scss';

class Tag extends React.Component {
  getColor() {
    switch (this.props.project.type) {
      case "Positions":
        return "tag-yellow";
      case "Languages":
        return "tag-orange";
      case "Technologies":
        return "tag-purple";
      case "Difficulty":
          return "tag-grey";
      case "Topics":
        return "tag-red";
      default:
        return null;
    }
  }

  render () {
    return (
      <div className={`project-tag ${this.getColor()}`}>
        {this.project.name}
      </div>
    );
  }
};

Tag.propTypes = {
  project: PropTypes.object,
};

export default Tag;
