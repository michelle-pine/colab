import React from 'react';
import PropTypes from 'prop-types';
import './Tag.scss';


class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.alternateClick = this.alternateClick.bind(this);
  }
  getColor() {
    switch (this.props.tag.type) {
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

  alternateClick(e) {
    console.log(this.props);
    this.props.history.push(`/?tag=${this.props.tag.id}`);
  }

  render () {
    return (
      <button onClick={this.props.onTagClick || this.alternateClick} data-id={this.props.tag.id} className={`project-tag ${this.getColor()}`}>
        {this.props.tag.name}
      </button>
    );
  }
};

Tag.propTypes = {
  tag: PropTypes.object,
  onTagClick: PropTypes.func,
  history: PropTypes.object,
};

export default Tag;
