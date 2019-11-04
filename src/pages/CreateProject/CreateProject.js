import React from 'react';
import PropTypes from 'prop-types';
import './CreateProject.scss';

import MultiSelect from "@khanacademy/react-multi-select";

//stores
import store from '../../store/index';
import { addProject } from "../../actions/index";


class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    const storeUsers = store.getState().users;
    const users = Object.keys(storeUsers).map(function (key) {
      return { label: storeUsers[key]["firstname"] + " " + storeUsers[key]["lastname"], value: key};
    });
    const storeTags = store.getState().tags;
    const tags = Object.keys(storeTags).map(function (key) {
      return { label: storeTags[key]["name"] , value: key, type: storeTags[key]["type"]};
    });
    console.log(users);
    this.state = { 
      step: 1, 
      newProject: {
        projectMembers: {
          "front-end": [],
          "back-end": [],
          "design": [],
          "business": [],
        },
        tags: []
      }, 
      allUsers: users, 
      showSelect: {
        "front-end": false,
        "back-end": false,
        "design": false,
        "business": false,
      },
      allTags: tags,
      selectedLanguages: [],
      selectedTechnologies: [],
      selectedTopics: [],
    };
    this.onSubmitStepOne = this.onSubmitStepOne.bind(this);
    this.onSubmitStepTwo = this.onSubmitStepTwo.bind(this);
    this.onSubmitStepThree = this.onSubmitStepThree.bind(this);
    this.onSelectCheckbox = this.onSelectCheckbox.bind(this)
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
  }

  onSubmitStepTwo(e) {
    e.preventDefault();
    const elements = e.target.elements;
    let curProject = this.state.newProject;
    if (elements["need-front-end"].checked) curProject.tags.push(1);
    if (elements["need-back-end"].checked) curProject.tags.push(2);
    if (elements["need-design"].checked) curProject.tags.push(3);
    if (elements["need-business"].checked) curProject.tags.push(4);
    if (elements["am-front-end"].checked) curProject.projectMembers["front-end"].push(1);
    if (elements["am-back-end"].checked) curProject.projectMembers["back-end"].push(2);
    if (elements["am-design"].checked) curProject.projectMembers["design"].push(3);
    if (elements["am-business"].checked) curProject.projectMembers["business"].push(4);
    this.setState({ step: 3, newProject: curProject});
  }

  onSubmitStepThree(e) {
    e.preventDefault();
    let curProject = this.state.newProject;
    const difficulty = e.target.elements["difficulty-select"].value;
    if (difficulty !== "") curProject.tags.push(difficulty);
    curProject.tags = curProject.tags.concat(this.state.selectedLanguages).concat(this.state.selectedTechnologies).concat(this.state.selectedTopics)
    let id = 0;
    while (true) {
      if (!store.getState().users[id]) {
        break;
      }
      id++;
    }
    curProject.createdAt = Date.now();
    curProject.creatorId = 999;
    const payload = {id: id, project: curProject}
    store.dispatch(addProject(payload));
    this.props.history.push("/");
  }

  onSelectCheckbox(e) {
    const id = e.target.id.substring(5, e.target.id.length); 
    let curSelectState = this.state.showSelect;
    curSelectState[id] = !curSelectState[id]
    this.setState({showSelect: curSelectState});
  }

  renderStepOne() {
    return (
      <form className="create-project-form step-one" onSubmit={this.onSubmitStepOne}>
        <h2>1. General Info:</h2>
        <div className="create-project-inputs">
          <div className="form-group">
            <label htmlFor="new-project-name">Project Name</label>
            <input type="text" value={this.state.newProject.name} required className="form-control" id="new-project-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="new-project-description">Description</label>
            <textarea className="form-control" value={this.state.newProject.description} id="new-project-description"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="new-project-github"><i className="fa fa-github"></i>&nbsp;Github Link</label>
            <input type="text" value={this.state.newProject.githubLink} className="form-control" id="new-project-github" placeholder="https://"/>
          </div>
          <div className="form-group">
            <label htmlFor="new-project-prototype"><i className="fa fa-link"></i>&nbsp;Link to Prototype</label>
            <input type="text" value={this.state.newProject.prototypeLink} className="form-control" id="new-project-prototype" placeholder="https://"/>
          </div>
          <div className="form-group form-button-group">
            <button type="submit" className="go-button">Continue</button>
            <button onClick={() => this.props.history.push("/")} className="back-button">Cancel</button>
          </div>
        </div>
      </form>
    );
  }

  renderSelectCheckbox(type) {
    const selected = this.state.newProject.projectMembers[type];
    let curProject = this.state.newProject;
    let select = <div className="member-select">
      <MultiSelect
        options={this.state.allUsers}
        selected={selected}
        onSelectedChanged={function (selected) {
          curProject.projectMembers[type] = selected;
          this.setState({newProject: curProject})
        }.bind(this)}
        overrideStrings={{
          selectSomeItems: "Select Some Members...",
          allItemsAreSelected: "All Items are Selected",
          selectAll: "Select All",
          search: "Search",
      }}
      />
    </div>
    return (
      <div className="form-check">
        <input onClick={this.onSelectCheckbox} className="form-check-input"  id={`have-${type}`} type="checkbox" name="past-experience"/>
        <label className="form-check-label" htmlFor={`have-${type}`} >I have teammates</label>
          {this.state.showSelect[type] ? select : null}
      </div>
    )
  }

  renderStepTwo() {
    return (
      <form className="create-project-form step-two" onSubmit={this.onSubmitStepTwo}>
        <h2>2. Teammates:</h2>
        <div className="create-project-inputs">
          <p>Please select the status of your project team. Alternatively, you may leave all checkboxes blank.</p>
          <fieldset className="front-end-teammates teammate-section">
            <legend><h3>Front-End</h3></legend>
            <div className="form-check">
              <input className="form-check-input" id="need-front-end" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="need-front-end">I need teammates</label>
            </div>
            {this.renderSelectCheckbox("front-end")}
            <div className="form-check">
              <input className="form-check-input" id="am-front-end" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="am-front-end">I represent this department</label>
            </div>
          </fieldset>
          <fieldset className="back-end-teammates teammate-section">
            <legend><h3>Back-End</h3></legend>
            <div className="form-check">
              <input className="form-check-input" id="need-back-end" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="need-back-end">I need teammates</label>
            </div>
            {this.renderSelectCheckbox("back-end")}
            <div className="form-check">
              <input className="form-check-input" id="am-back-end" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="am-back-end">I represent this department</label>
            </div>
          </fieldset>
          <fieldset className="design-teammates teammate-section">
            <legend><h3>Design</h3></legend>
            <div className="form-check">
              <input className="form-check-input" id="need-design" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="need-design">I need teammates</label>
            </div>
            {this.renderSelectCheckbox("design")}
            <div className="form-check">
              <input className="form-check-input" id="am-design" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="am-design">I represent this department</label>
            </div>
          </fieldset>
          <fieldset className="business-teammates teammate-section">
            <legend><h3>Business</h3></legend>
            <div className="form-check">
              <input className="form-check-input" id="need-business" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="need-business">I need teammates</label>
            </div>
            {this.renderSelectCheckbox("business")}
            <div className="form-check">
              <input className="form-check-input" id="am-business" type="checkbox" name="past-experience"/>
              <label className="form-check-label" htmlFor="am-business">I represent this department</label>
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
    const languages = this.state.allTags.filter(function(tag) {
      return tag.type === "Languages";
    }).sort((a, b) => a.label < b.label ? -1 : 1);
    const technologies = this.state.allTags.filter(function(tag) {
      return tag.type === "Technologies";
    }).sort((a, b) => a.label < b.label ? -1 : 1);
    const topics = this.state.allTags.filter(function(tag) {
      return tag.type === "Topics";
    }).sort((a, b) => a.label < b.label ? -1 : 1);
    const selected = this.state.newProject.tags;
    let curProject = this.state.newProject;
    return (
      <form className="create-project-form step-three" onSubmit={this.onSubmitStepThree}>
        <h2>3. Tags:</h2>
        <div className="create-project-inputs">
          <p>Please select some tags to describe this project. You may also leave this section blank.</p>
          <div className="form-group">
            <legend><h3>Languages</h3></legend>
            <MultiSelect
                options={languages}
                selected={this.state.selectedLanguages}
                onSelectedChanged={function (selected) {
                  this.setState({selectedLanguages: selected})
                }.bind(this)}
                overrideStrings={{
                  selectSomeItems: "Select Language Tags",
                  allItemsAreSelected: "All Items are Selected",
                  selectAll: "Select All",
                  search: "Search",
              }}
            />
          </div>
          <div className="form-group">
            <legend><h3>Technologies</h3></legend>
            <MultiSelect
                options={technologies}
                selected={this.state.selectedTechnologies}
                onSelectedChanged={function (selected) {
                  this.setState({selectedTechnologies: selected})
                }.bind(this)}
                overrideStrings={{
                  selectSomeItems: "Select Technology Tags",
                  allItemsAreSelected: "All Items are Selected",
                  selectAll: "Select All",
                  search: "Search",
              }}
            />
          </div>
          <div className="form-group">
            <legend><h3>Topics</h3></legend>
            <MultiSelect
                options={topics}
                selected={this.state.selectedTopics}
                onSelectedChanged={function (selected) {
                  this.setState({selectedTopics: selected})
                }.bind(this)}
                overrideStrings={{
                  selectSomeItems: "Select Topic Tags",
                  allItemsAreSelected: "All Items are Selected",
                  selectAll: "Select All",
                  search: "Search",
              }}
            />
          </div>
          <div className="form-group">
            <legend><h3>Difficulty</h3></legend>
            <div class="form-group">
              <label className="sr-only" for="difficulty-select">Select Difficulty</label>
              <select defaultValue="" class="form-control" id="difficulty-select">
                <option value="" disabled>Select Difficulty</option>
                <option value="56">Entry</option>
                <option value="57">Intermediate</option>
                <option value="58">Advanced</option>
              </select>
            </div>
          </div>
          <div className="form-group form-button-group">
            <div className="grouped-buttons">
              <button type="submit" className="go-button">Finish</button>
              <button onClick={() => this.setState({step: 2})} className="back-button">Back</button>
            </div>
            <button onClick={() => this.props.history.push("/")} className="back-button">Cancel</button>
          </div>    
        </div>
      </form>
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
              <button className="nav-button" onClick={() => this.setState({step: 1})}>1. General Information</button>
              <button className="nav-button" disabled={this.state.step < 2} onClick={() => this.setState({step: 2})}>2. Teammates</button>
              <button className="nav-button" disabled={this.state.step < 3} onClick={() => this.setState({step: 3})}>3. Tags</button>
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
