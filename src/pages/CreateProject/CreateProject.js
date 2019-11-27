import React from "react";
import PropTypes from "prop-types";
import "./CreateProject.scss";

import MultiSelect from "@khanacademy/react-multi-select";
import HelpDialog from "../../components/HelpDialog/HelpDialog";

//stores
import store from "../../store/index";
import { addProject, editProject } from "../../actions/index";

import {
  BUSINESS,
  FRONT_END,
  BACK_END,
  DESIGN,
  NEED_BUSINESS,
  NEED_BACK_END,
  NEED_FRONT_END,
  NEED_DESIGN,
  AM_BUSINESS,
  AM_BACK_END,
  AM_FRONT_END,
  AM_DESIGN
} from "../../constants/common";

const POSITIONS = [BUSINESS, DESIGN, FRONT_END, BACK_END];

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    const storeUsers = store.getState().users;
    const users = Object.keys(storeUsers).map(function(key) {
      return {
        label: storeUsers[key]["firstname"] + " " + storeUsers[key]["lastname"],
        value: key
      };
    });
    const storeTags = store.getState().tags;
    const tags = Object.keys(storeTags).map(function(key) {
      return {
        label: storeTags[key]["name"],
        value: key,
        type: storeTags[key]["type"]
      };
    });
    this.state = {
      step: 1,
      newProject: {
        projectMembers: {
          "front-end": [],
          "back-end": [],
          design: [],
          business: []
        },
        tags: [],
        author: users[999]
      },
      allUsers: users,
      showSelect: {
        "front-end": false,
        "back-end": false,
        design: false,
        business: false
      },
      allTags: tags,
      selectedLanguages: [],
      selectedTechnologies: [],
      selectedTopics: [],
      stepTwo: {},
      stepThree: {},
      difficulty: "",
      isEditing: false
    };
    this.onSubmitStepOne = this.onSubmitStepOne.bind(this);
    this.onSubmitStepTwo = this.onSubmitStepTwo.bind(this);
    this.onSubmitStepThree = this.onSubmitStepThree.bind(this);
    this.onSelectCheckbox = this.onSelectCheckbox.bind(this);
    this.goBack = this.goBack.bind(this);
    this.onSelectDifficulty = this.onSelectDifficulty.bind(this);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onReClickCheckbox = this.onReClickCheckbox.bind(this);
  }

  componentDidMount() {
    this.handleEditMode();
  }

  handleEditMode() {
    const { id } = this.props.match.params;

    if (id) {
      let languages = [];
      let technologies = [];
      let topics = [];
      let stepTwo = {};
      let tags = store.getState().tags;
      let project = Object.assign({}, store.getState().projects[id]);
      let curProject = this.state.newProject;
      let difficulty = "";

      curProject.projectId = id;
      curProject.name = project.name;
      curProject.description = project.description;
      curProject.githubLink = project.githubLink;
      curProject.prototypeLink = project.prototypeLink;
      curProject.projectMembers = Object.assign({}, project.projectMembers);
      curProject.tags = project.tags;

      curProject.tags.forEach(tagId => {
        let tagData = tags[tagId];
        switch (tagData.type) {
          case "Languages":
            languages.push(tagId);
            return;
          case "Technologies":
            technologies.push(tagId);
            return;
          case "Topics":
            topics.push(tagId);
            return;
          case "Difficulty":
            difficulty = tagId;
            return;
          case "Positions":
            switch (tagData.name) {
              case "Needs Back-End":
                stepTwo[NEED_BACK_END] = true;
                return;
              case "Needs Designer":
                stepTwo[NEED_DESIGN] = true;
                return;
              case "Needs Front-End":
                stepTwo[NEED_FRONT_END] = true;
                return;
              case "Needs Business":
                stepTwo[NEED_BUSINESS] = true;
                return;
              default:
                return;
            }
            return;
          default:
            return;
        }
      });

      let showSelect = {};
      POSITIONS.forEach(position => {
        if (curProject.projectMembers[position].indexOf(999) >= 0)
          stepTwo[`am-${position}`] = true;

        if (
          (curProject.projectMembers[position].indexOf(999) < 0 &&
            curProject.projectMembers[position].length > 0) ||
          (curProject.projectMembers[position].indexOf(999) >= 0 &&
            curProject.projectMembers[position].length > 1)
        )
          showSelect[position] = true;
      });

      this.setState({
        newProject: curProject,
        selectedLanguages: languages,
        selectedTechnologies: technologies,
        selectedTopics: topics,
        stepTwo: stepTwo,
        showSelect: showSelect,
        difficulty: difficulty,
        isEditing: true
      });
    }
  }

  goBack(e) {
    e.preventDefault();
    const curState = this.state.step;
    this.setState({ step: curState - 1 });
  }

  onSubmitStepOne(e) {
    e.preventDefault();
    const elements = e.target.elements;
    let curProject = this.state.newProject;
    curProject.name = elements["new-project-name"].value;
    curProject.description = elements["new-project-description"].value;
    curProject.githubLink = elements["new-project-github"].value;
    curProject.prototypeLink = elements["new-project-prototype"].value;
    this.setState({
      step: 2,
      finishedSteps: Math.max(1, this.state.finishedSteps),
      newProject: curProject
    });
  }

  onSubmitStepTwo(e) {
    e.preventDefault();
    const elements = e.target.elements;
    let curProject = this.state.newProject;
    let tags = [];
    if (elements[NEED_FRONT_END].checked) tags.push(1);
    if (elements[NEED_BACK_END].checked) tags.push(2);
    if (elements[NEED_DESIGN].checked) tags.push(3);
    if (elements[NEED_BUSINESS].checked) tags.push(4);
    curProject.tags = tags;

    for (let type of POSITIONS) {
      if (
        elements[`am-${type}`].checked &&
        !curProject.projectMembers[type].includes(999)
      ) {
        curProject.projectMembers[type].push(999);
      } else if (
        !elements[`am-${type}`].checked &&
        curProject.projectMembers[type].includes(999)
      ) {
        let index = curProject.projectMembers[type].indexOf(999);
        curProject.projectMembers[type].splice(index, 1);
      }
    }

    const curValues = {
      "need-front-end": elements[NEED_FRONT_END].checked,
      "need-back-end": elements[NEED_BACK_END].checked,
      "need-design": elements[NEED_DESIGN].checked,
      "need-business": elements[NEED_BUSINESS].checked,
      "am-front-end": elements[AM_FRONT_END].checked,
      "am-back-end": elements[AM_BACK_END].checked,
      "am-design": elements[AM_DESIGN].checked,
      "am-business": elements[AM_BUSINESS].checked
    };

    this.setState({
      step: 3,
      newProject: curProject,
      finishedSteps: Math.max(2, this.state.finishedSteps),
      stepTwo: curValues
    });
  }

  setId() {
    let id;
    if (this.state.isEditing) {
      id = this.props.match.params.id;
    } else {
      id = 0;
      while (true) {
        if (!store.getState().projects[id]) {
          break;
        }
        id++;
      }
    }
    this.setState({newProjectId:id})
    console.log(id)
    console.log(this.state.newProjectId)

  }

  onSubmitStepThree(e) {
    e.preventDefault();
    let curProject = this.state.newProject;
    const difficulty = e.target.elements["difficulty-select"].value;
    if (difficulty !== "") curProject.tags.push(difficulty);
    curProject.tags = curProject.tags
      .concat(this.state.selectedLanguages)
      .concat(this.state.selectedTechnologies)
      .concat(this.state.selectedTopics);

    curProject.creatorId = 999;
    curProject.createdAt = Date.now();

    let payload;
    let id;
    if (this.state.isEditing) {
      id = this.props.match.params.id;
      payload = { id: id, project: curProject };
      store.dispatch(editProject(payload));
    } else {
      id = 0;
      while (true) {
        if (!store.getState().projects[id]) {
          break;
        }
        id++;
      }
      payload = { id: id, project: curProject };
      store.dispatch(addProject(payload));
    }

    //this.props.history.push(`/projects/${id}`);
    this.setState({ stepThree: e.target.elements, newProjectId:id });
  }

  onSelectDifficulty(e) {
    const difficulty = e.target.value;
    this.setState({ difficulty: difficulty });
  }

  onSelectCheckbox(e) {
    const id = e.target.id.substring(5, e.target.id.length);
    let curSelectState = this.state.showSelect;
    curSelectState[id] = !curSelectState[id];
    const curProject = this.state.newProject;
    if (curSelectState[id] === false) curProject.projectMembers[id] = [];
    this.setState({ showSelect: curSelectState });
  }

  onChangeProjectName(e) {
    let curProject = this.state.newProject;
    curProject.name = e.target.value;
    this.setState({ newProject: curProject });
  }

  renderStepOne() {
    return (
      <form
        className="create-project-form step-one"
        onSubmit={this.onSubmitStepOne}
      >
        <h2>1. General Info:</h2>
        <div className="create-project-inputs">
          <div className="form-group">
            <label htmlFor="new-project-name">
              Project Name<i className="required-icon fa fa-asterisk"></i>
            </label>
            <input
              type="text"
              onChange={this.onChangeProjectName}
              defaultValue={this.state.newProject.name}
              required
              className="form-control"
              id="new-project-name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-project-description">Description</label>
            <textarea
              className="form-control"
              defaultValue={this.state.newProject.description}
              id="new-project-description"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="new-project-github">
              <i className="fa fa-github"></i>&nbsp;Github Link{" "}
              <HelpDialog message="Paste the link to the Github Repository for this project." />
            </label>
            <input
              type="text"
              defaultValue={this.state.newProject.githubLink}
              className="form-control"
              id="new-project-github"
              placeholder="https://"
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-project-prototype">
              <i className="fa fa-link"></i>&nbsp;Link to Prototype{" "}
              <HelpDialog message="Paste the link to a folder or online platform that displays the prototype for this project." />
            </label>
            <input
              type="text"
              defaultValue={this.state.newProject.prototypeLink}
              className="form-control"
              id="new-project-prototype"
              placeholder="https://"
            />
          </div>
          <div className="form-group required-icon">
            <i className="required-icon fa fa-asterisk"></i>&nbsp;Required
          </div>
          <div className="form-group form-button-group">
            <button type="submit" className="go-button">
              Continue
            </button>
            <button
              data-toggle="modal"
              data-target="#myModal"
              className="back-button"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
        {this.renderDialog()}
      </form>
    );
  }

  renderSelectCheckbox(type) {
    const selected = this.state.newProject.projectMembers[type];
    let curProject = this.state.newProject;
    let select = (
      <div className="member-select">
        <MultiSelect
          options={this.state.allUsers}
          selected={selected}
          onSelectedChanged={function(selected) {
            curProject.projectMembers[type] = selected;
            this.setState({ newProject: curProject });
          }.bind(this)}
          overrideStrings={{
            selectSomeItems: "Select Some Members...",
            allItemsAreSelected: "All Items are Selected",
            selectAll: "Select All",
            search: "Search"
          }}
        />
      </div>
    );
    return (
      <div className="form-check">
        <input
          checked={this.state.showSelect[type]}
          onClick={this.onSelectCheckbox}
          className="form-check-input"
          id={`have-${type}`}
          type="checkbox"
          name="past-experience"
        />
        <label className="form-check-label" htmlFor={`have-${type}`}>
          I have teammates
        </label>
        {this.state.showSelect[type] ? select : null}
      </div>
    );
  }

  onReClickCheckbox(e) {
    const id = e.target.id;
    const stepTwo = this.state.stepTwo;
    stepTwo[id] = !stepTwo[id];
    this.setState({ stepTwo: stepTwo });
  }

  handleCancelClicked = () => {
    this.props.history.push("/");
  };

  renderDialog() {
    return (
      <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div class="modal-body">
              <p>
                Are you sure you want to cancel? The unsaved changes will be
                lost.
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="back-button"
                data-dismiss="modal"
                onClick={this.handleCancelClicked}
              >
                Cancel project {this.state.isEditing ? "editing" : "creation"}
              </button>
              <button type="button" className="go-button" data-dismiss="modal">
                Continue project {this.state.isEditing ? "editing" : "creation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSuccessDialog() {
    return (
      <div id="successModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div class="modal-body">
              <p>
                The project was successfully{" "}
                {this.state.isEditing ? "edited" : "created"}!
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="back-button"
                data-dismiss="modal"
                onClick={this.handleSuccessDialogClicked}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleSuccessDialogClicked = () => {
    this.props.history.push(`/projects/${this.state.newProjectId}`);
  };

  renderStepTwo() {
    return (
      <form
        className="create-project-form step-two"
        onSubmit={this.onSubmitStepTwo}
      >
        <h2>2. Teammates:</h2>
        <div className="create-project-inputs">
          <p>
            Please select the status of your project team. Alternatively, you
            may leave all checkboxes blank.
          </p>
          <fieldset className="front-end-teammates teammate-section">
            <legend>
              <h3>
                Front-End{" "}
                <HelpDialog message="The client-facing side of the code for this project." />
              </h3>
            </legend>
            <div className="form-check">
              <input
                onClick={this.onReClickCheckbox}
                checked={this.state.stepTwo["need-front-end"]}
                className="form-check-input"
                id="need-front-end"
                type="checkbox"
                name="past-experience"
              />
              <label className="form-check-label" htmlFor="need-front-end">
                I need teammates
              </label>
            </div>
            {this.renderSelectCheckbox("front-end")}
            <div className="form-check">
              <input
                onClick={this.onReClickCheckbox}
                checked={this.state.stepTwo["am-front-end"]}
                className="form-check-input"
                id="am-front-end"
                type="checkbox"
                name="past-experience"
              />
              <label className="form-check-label" htmlFor="am-front-end">
                I represent this department
              </label>
            </div>
          </fieldset>
          <fieldset className="back-end-teammates teammate-section">
            <legend>
              <h3>
                Back-End{" "}
                <HelpDialog message="The core computational side of the code for this project." />
              </h3>
            </legend>
            <div className="form-check">
              <input
                onClick={this.onReClickCheckbox}
                checked={this.state.stepTwo["need-back-end"]}
                className="form-check-input"
                id="need-back-end"
                type="checkbox"
                name="past-experience"
              />
              <label className="form-check-label" htmlFor="need-back-end">
                I need teammates
              </label>
            </div>
            {this.renderSelectCheckbox("back-end")}
            <div className="form-check">
              <input
                onClick={this.onReClickCheckbox}
                checked={this.state.stepTwo["am-back-end"]}
                className="form-check-input"
                id="am-back-end"
                type="checkbox"
                name="past-experience"
              />
              <label className="form-check-label" htmlFor="am-back-end">
                I represent this department
              </label>
            </div>
          </fieldset>
          <fieldset className="design-teammates teammate-section">
            <legend>
              <h3>
                Design{" "}
                <HelpDialog message="The visual considerations for this project." />
              </h3>
            </legend>
            <div className="form-check">
              <input
                onClick={this.onReClickCheckbox}
                checked={this.state.stepTwo["need-design"]}
                className="form-check-input"
                id="need-design"
                type="checkbox"
                name="past-experience"
              />
              <label className="form-check-label" htmlFor="need-design">
                I need teammates
              </label>
            </div>
            {this.renderSelectCheckbox("design")}
            <div className="form-check">
              <input
                onClick={this.onReClickCheckbox}
                className="form-check-input"
                checked={this.state.stepTwo["am-design"]}
                id="am-design"
                type="checkbox"
                name="past-experience"
              />
              <label className="form-check-label" htmlFor="am-design">
                I represent this department
              </label>
            </div>
          </fieldset>
          <fieldset className="business-teammates teammate-section">
            <legend>
              <h3>
                Business{" "}
                <HelpDialog message="The product management side of this project." />
              </h3>
            </legend>
            <div className="form-check">
              <input
                onClick={this.onReClickCheckbox}
                checked={this.state.stepTwo["need-business"]}
                className="form-check-input"
                id="need-business"
                type="checkbox"
                name="past-experience"
              />
              <label className="form-check-label" htmlFor="need-business">
                I need teammates
              </label>
            </div>
            {this.renderSelectCheckbox("business")}
            <div className="form-check">
              <input
                onClick={this.onReClickCheckbox}
                checked={this.state.stepTwo["am-business"]}
                className="form-check-input"
                id="am-business"
                type="checkbox"
                name="past-experience"
              />
              <label className="form-check-label" htmlFor="am-business">
                I represent this department
              </label>
            </div>
          </fieldset>
          <div className="form-group form-button-group">
            <div className="grouped-buttons">
              <button type="submit" className="go-button">
                Continue
              </button>
              <button onClick={this.goBack} className="back-button">
                Back
              </button>
            </div>
            <button
              data-toggle="modal"
              data-target="#myModal"
              className="back-button"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
        {this.renderDialog()}
      </form>
    );
  }

  renderStepThree() {
    const languages = this.state.allTags
      .filter(function(tag) {
        return tag.type === "Languages";
      })
      .sort((a, b) => (a.label < b.label ? -1 : 1));
    const technologies = this.state.allTags
      .filter(function(tag) {
        return tag.type === "Technologies";
      })
      .sort((a, b) => (a.label < b.label ? -1 : 1));
    const topics = this.state.allTags
      .filter(function(tag) {
        return tag.type === "Topics";
      })
      .sort((a, b) => (a.label < b.label ? -1 : 1));
    return (
      <form
        className="create-project-form step-three"
        onSubmit={this.onSubmitStepThree}
      >
        <h2>3. Tags:</h2>
        <div className="create-project-inputs">
          <p>
            Please select some tags to describe this project. You may also leave
            this section blank.
          </p>
          <div className="form-group">
            <legend>
              <h3>
                Languages{" "}
                <HelpDialog message="The coding languages used to implement this project (i.e. Java, Python, Javascript)." />
              </h3>
            </legend>
            <MultiSelect
              options={languages}
              selected={this.state.selectedLanguages}
              onSelectedChanged={function(selected) {
                this.setState({ selectedLanguages: selected });
              }.bind(this)}
              overrideStrings={{
                selectSomeItems: "Select Language Tags",
                allItemsAreSelected: "All Items are Selected",
                selectAll: "Select All",
                search: "Search"
              }}
            />
          </div>
          <div className="form-group">
            <legend>
              <h3>
                Technologies{" "}
                <HelpDialog message="The non-coding language technologies used to implement this project." />
              </h3>
            </legend>
            <MultiSelect
              options={technologies}
              selected={this.state.selectedTechnologies}
              onSelectedChanged={function(selected) {
                this.setState({ selectedTechnologies: selected });
              }.bind(this)}
              overrideStrings={{
                selectSomeItems: "Select Technology Tags",
                allItemsAreSelected: "All Items are Selected",
                selectAll: "Select All",
                search: "Search"
              }}
            />
          </div>
          <div className="form-group">
            <legend>
              <h3>
                Topics{" "}
                <HelpDialog message="The genre of application of this project." />
              </h3>
            </legend>
            <MultiSelect
              options={topics}
              selected={this.state.selectedTopics}
              onSelectedChanged={function(selected) {
                this.setState({ selectedTopics: selected });
              }.bind(this)}
              overrideStrings={{
                selectSomeItems: "Select Topic Tags",
                allItemsAreSelected: "All Items are Selected",
                selectAll: "Select All",
                search: "Search"
              }}
            />
          </div>
          <div className="form-group">
            <legend>
              <h3>
                Difficulty{" "}
                <HelpDialog message="The proficiency level in coding/design/business required to complete this project." />
              </h3>
            </legend>
            <div className="form-group">
              <label className="sr-only" htmlFor="difficulty-select">
                Select Difficulty
              </label>
              <select
                onChange={this.onSelectDifficulty}
                defaultValue={this.state.difficulty}
                className="form-control"
                id="difficulty-select"
              >
                <option value="">No Listed Difficulty</option>
                <option value="56">Entry</option>
                <option value="57">Intermediate</option>
                <option value="58">Advanced</option>
              </select>
            </div>
          </div>
          <div className="form-group form-button-group">
            <div className="grouped-buttons">
              <button
                data-toggle="modal"
                data-target="#successModal"
                type="submit"
                className="go-button"
              >
                Finish
              </button>
              <button onClick={this.goBack} className="back-button">
                Back
              </button>
            </div>
            <button
              data-toggle="modal"
              data-target="#myModal"
              className="back-button"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
        {this.renderDialog()}
        {this.renderSuccessDialog()}
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
    if (!store.getState().user.loggedIn) {
      this.props.history.push("/login");
    }
    return (
      <div className="create-project">
        <div className="sidebar">
          <div className="sidebar-box">
            {this.state.isEditing ? (
              <h1>Edit Project</h1>
            ) : (
              <h1>Create Project</h1>
            )}

            <div className="sidebar-steps">
              <button
                className={`nav-button ${
                  this.state.step === 1 ? "active" : null
                }`}
                onClick={() => this.setState({ step: 1 })}
              >
                1. General Information
              </button>
              <button
                className={`nav-button ${
                  this.state.step === 2 ? "active" : null
                }`}
                disabled={this.state.step < 2 && !this.state.finishedSteps}
                onClick={() => {
                  if (this.state.newProject.name) this.setState({ step: 2 });
                }}
              >
                2. Teammates
              </button>
              <button
                className={`nav-button ${
                  this.state.step === 3 ? "active" : null
                }`}
                disabled={
                  this.state.step < 3 &&
                  (!this.state.finishedSteps || this.state.finishedSteps < 2)
                }
                onClick={() => {
                  if (this.state.newProject.name) this.setState({ step: 3 });
                }}
              >
                3. Tags
              </button>
            </div>
          </div>
        </div>
        <div className="create-container">
          <div className="create-project-form-wrapper">{this.renderStep()}</div>
        </div>
      </div>
    );
  }
}

CreateProject.defaultProps = {};

CreateProject.propTypes = {};

export default CreateProject;
