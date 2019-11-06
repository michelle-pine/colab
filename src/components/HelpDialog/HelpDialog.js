import React from 'react';
import PropTypes from 'prop-types';
import './HelpDialog.scss';

class HelpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onHovering = this.onHovering.bind(this);
    this.onNotHovering = this.onNotHovering.bind(this);
    this.state = { show: false };
  }

  show(e) {
    this.setState({show: true})
  }

  hide(e) {
    this.setState({show: false})
  }

  onHovering(e) {
    this.show(e);
  }

  onNotHovering(e) {
    this.hide(e)
  }

  render() {
    return (
      <span className="help-dialog" tabIndex="0" onMouseOver={this.onHovering} onFocus={this.onHovering} onBlur={this.onNotHovering} onMouseOut={this.onNotHovering}>
        <i className="fa fa-question"><span className="sr-only">Help</span></i>
        <div className={`help-message ${this.state.show ? "show" : ""}`}>
          {this.props.message}
        </div>
      </span>
    );

  }

};

HelpDialog.defaultProps = {
  message: "Help Here",
};

HelpDialog.propTypes = {
  message: PropTypes.string,
};

export default HelpDialog;
