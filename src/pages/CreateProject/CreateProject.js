import React from 'react';
import PropTypes from 'prop-types';
import './CreateProject.scss';

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 1, newProject: {}, };
    this.onSubmitStepOne = this.onSubmitStepOne.bind(this);
    this.onSubmitStepTwo = this.onSubmitStepTwo.bind(this);
    this.onSubmitStepThree = this.onSubmitStepThree.bind(this);
  }

  onSubmitStepOne(e) {
    e.preventDefault();
    const elements = e.target.elements;
    let curProject = this.state.newProject;
    curProject.name = elements["new-project-name"].value;
    curProject.description = elements["new-project-description"].value;
    curProject.githubLink = elements["new-project-github"].value;
    curProject.prototypeLink = elements["new-project-prototype"].value;
    this.setState({ step: 2, newProject: curProject});
    console.log(this.state);
  }

  onSubmitStepTwo(e) {
    e.preventDefault();
    
  }

  onSubmitStepThree(e) {
    e.preventDefault();
    
  }

  renderStepOne() {
    return (
      <form className="create-project-form step-one" onSubmit={this.onSubmitStepOne}>
        <h2>1. General Info:</h2>
        <div className="create-project-inputs">
          <div class="form-group">
            <label for="new-project-name">Project Name</label>
            <input type="text" value={this.state.newProject.name} required class="form-control" id="new-project-name"/>
          </div>
          <div class="form-group">
            <label for="new-project-description">Description</label>
            <textarea class="form-control" value={this.state.newProject.description} id="new-project-description"></textarea>
          </div>
          <div class="form-group">
            <label for="new-project-github"><i className="fa fa-github"></i>&nbsp;Github Link</label>
            <input type="text" value={this.state.newProject.githubLink} class="form-control" id="new-project-github" placeholder="https://"/>
          </div>
          <div class="form-group">
            <label for="new-project-prototype"><i className="fa fa-link"></i>&nbsp;Link to Prototype</label>
            <input type="text" value={this.state.newProject.prototypeLink} class="form-control" id="new-project-prototype" placeholder="https://"/>
          </div>
          <div className="form-group form-button-group">
            <button type="submit" className="go-button">Continue</button>
            <button onClick={() => this.props.history.push("/")} className="back-button">Cancel</button>
          </div>
        </div>
      </form>
    );
  }

  renderStepTwo() {
    return (
      <form className="create-project-form step-one" onSubmit={this.onSubmitStepOne}>
        <h2>2. Teammates:</h2>
        <div className="create-project-inputs">
          <p>Please select the status of your project team.</p>
          <fieldset className="front-end-teammates teammate-section">
            <legend><h3>Front-End</h3></legend>
            <div className="form-check">
              <input className="form-check-input" id="need-front-end" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="need-front-end">I need teammates</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" id="am-front-end" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="am-front-end">I represent this department</label>
            </div>
            <div className="form-check">
              <input className="form-check-input"  id="no-front-end" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="no-front-end">I don't need this department</label>
            </div>
          </fieldset>
          <fieldset className="back-end-teammates teammate-section">
            <legend><h3>Back-End</h3></legend>
            <div className="form-check">
              <input className="form-check-input" id="need-back-end" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="need-back-end">I need teammates</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" id="am-back-end" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="am-back-end">I represent this department</label>
            </div>
            <div className="form-check">
              <input className="form-check-input"  id="no-back-end" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="no-back-end">I don't need this department</label>
            </div>
          </fieldset>
          <fieldset className="design-teammates teammate-section">
            <legend><h3>Design</h3></legend>
            <div className="form-check">
              <input className="form-check-input" id="need-design" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="need-design">I need teammates</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" id="am-design" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="am-design">I represent this department</label>
            </div>
            <div className="form-check">
              <input className="form-check-input"  id="no-design" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="no-design">I don't need this department</label>
            </div>
          </fieldset>
          <fieldset className="business-teammates teammate-section">
            <legend><h3>Business</h3></legend>
            <div className="form-check">
              <input className="form-check-input" id="need-business" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="need-business">I need teammates</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" id="am-business" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="am-business">I represent this department</label>
            </div>
            <div className="form-check">
              <input className="form-check-input"  id="no-business" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="no-business">I don't need this department</label>
            </div>
          </fieldset>
          <div className="form-group form-button-group">
            <div className="grouped-buttons">
              <button type="submit" className="go-button">Continue</button>
              <button onClick={() => this.setState({step: 1})} className="back-button">Back</button>
            </div>
            <button onClick={() => this.props.history.push("/")} className="back-button">Cancel</button>
          </div>         
        </div>
      </form>
    );
  }

  renderStepThree() {
    return (
      <div></div>
    );
  }

  renderStep() {
    switch (this.state.step) {
      case 1: 
        return this.renderStepOne();
      case 2: 
        return this.renderStepTwo();
      case 3: 
        return this.renderStepThree();
    }
  }

  render() {
    return (
      <div className="create-project">
        <div className="sidebar">
          <div className="sidebar-box">
            <h1>Create Project</h1>
            <div className="sidebar-steps">

            </div>
          </div>
        </div>
        <div className="create-container">
          <div className="create-project-form-wrapper">
            {this.renderStep()}
          </div>
        </div>
      </div>
    );
  }
};

CreateProject.defaultProps = {

};

CreateProject.propTypes = {

};

export default CreateProject;
