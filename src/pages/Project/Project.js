import React from "react";
import "./Project.scss";
import store from "../../store/index";
import { projectUtils } from "../../utils/project_utils";
import Tag from "../../components/Tag/Tag";
import HelpDialog from "../../components/HelpDialog/HelpDialog";
import { Link } from "react-router-dom";

import {
  applyForProject,
  cancelApplication,
  deleteProject
} from "../../actions/index";
const CANCEL_APPLICATION = "Cancel Application";
const APPLY = "Apply";
const BUSINESS = "business";
const FRONT_END = "front-end";
const BACK_END = "back-end";
const DESIGN = "design";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessButtonText: "",
      designButtonText: "",
      frontendButtonText: "",
      backendButtonText: ""
    };

    this.goBack = this.goBack.bind(this);
  }
  getProject() {
    const { id } = this.props.match.params;
    let state = store.getState();
    let projects = state.projects;
    let project = projects[id];
    project.user = state.users[project.creatorId];
    return project;
  }

  filterTagsByCategory(tags, category) {
    return tags.filter(tag => tag.type === category);
  }

  handleApplyBackendClicked = () => {
    let newText =
      this.state.backendButtonText === APPLY ? CANCEL_APPLICATION : APPLY;
    this.setState({ backendButtonText: newText });
    this.updateUserOnApply(BACK_END, this.state.backendButtonText);
  };

  handleApplyFrontendClicked = () => {
    let newText =
      this.state.frontendButtonText === APPLY ? CANCEL_APPLICATION : APPLY;
    this.setState({ frontendButtonText: newText });
    this.updateUserOnApply(FRONT_END, this.state.frontendButtonText);
  };

  handleApplyDesignClicked = () => {
    let newText =
      this.state.designButtonText === APPLY ? CANCEL_APPLICATION : APPLY;
    this.setState({ designButtonText: newText });
    this.updateUserOnApply(DESIGN, this.state.designButtonText);
  };

  handleApplyBusinessClicked = () => {
    let newText =
      this.state.businessButtonText === APPLY ? CANCEL_APPLICATION : APPLY;
    this.setState({ businessButtonText: newText });
    this.updateUserOnApply(BUSINESS, this.state.businessButtonText);
  };

  updateUserOnApply(position, applied) {
    let hasApplied = applied === APPLY;
    let { id } = this.props.match.params;
    const payload = { projectId: id, position: position };
    if (hasApplied) {
      store.dispatch(applyForProject(payload));
    } else {
      store.dispatch(cancelApplication(payload));
    }
  }

  componentDidMount() {
    let pendingProjects = store.getState().user.myProjects.pending;
    this.setState({
      businessButtonText: this.searchForApplication(BUSINESS, pendingProjects)
        ? CANCEL_APPLICATION
        : APPLY,
      designButtonText: this.searchForApplication(DESIGN, pendingProjects)
        ? CANCEL_APPLICATION
        : APPLY,
      frontendButtonText: this.searchForApplication(FRONT_END, pendingProjects)
        ? CANCEL_APPLICATION
        : APPLY,
      backendButtonText: this.searchForApplication(BACK_END, pendingProjects)
        ? CANCEL_APPLICATION
        : APPLY
    });
  }

  searchForApplication(position, projects) {
    let { id } = this.props.match.params;
    let applied = false;
    projects.forEach(application => {
      if (id === application.projectId && position === application.position) {
        applied = true;
        return;
      }
    });
    return applied;
  }

  goBack(e) {
    this.props.history.go(-1);
  }

  renderBackButton() {
    const goBack = this.props.location.search.includes("goback");
    if (goBack) {
      return (
        <a className="back-link" onClick={this.goBack}>
          <i className="fa fa-chevron-left"></i> Back
        </a>
      );
    } else {
      return null;
    }
  }

  handleDeleteClicked = () => {
    this.props.history.push("/");
    let { id } = this.props.match.params;
    const payload = { id: id };
    store.dispatch(deleteProject(payload));
  };

  renderDeleteButton() {
    if (this.getProject().creatorId == 999) {
      return (
        <Link
          id="delete-link"
          data-toggle="modal"
          data-target="#myModal"
          href="#"
        >
          <i class="fa fa-minus-circle"></i> Delete
        </Link>
      );
    }
    return null;
  }

  renderAlternateState(project) {
    console.log(project);
    if (project.creatorId === 999) {
      return <div>Awaiting Applications</div>;
    } else {
      return null;
    }
  }

  render() {
    if (!store.getState().user.loggedIn) {
      this.props.history.push("/login");
    }
    let helpDesc = {
      Languages:
        "The coding languages used to implement a project (i.e. Java, Python, Javascript).",
      Technologies:
        "The non-coding language technologies used to implement this project.",
      Topics: "The genre of application of this project.",
      Difficulty:
        "The proficiency level in coding/design/business required to complete a project.",
      Positions: "The types of roles available for this project."
    };
    let project = this.getProject();
    let convertedProject = projectUtils.convertProject(project);
    let businessMembers = convertedProject.projectMembersExpanded[BUSINESS];
    let designMembers = convertedProject.projectMembersExpanded[DESIGN];
    let frontendMembers = convertedProject.projectMembersExpanded[FRONT_END];
    let backendMembers = convertedProject.projectMembersExpanded[BACK_END];
    let tagsCategories = [];

    convertedProject.tagsRich.forEach(tag => {
      if (tagsCategories.indexOf(tag.type) < 0) {
        tagsCategories.push(tag.type);
      }
    });

    return (
      <div id="project-container">
        <div id="top-links-container">{this.renderBackButton()}</div>
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
                  Are you sure you want to delete this project? All of the data
                  will be lost.
                </p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  className="back-button"
                  data-dismiss="modal"
                  onClick={this.handleDeleteClicked}
                >
                  Delete project
                </button>
                <button
                  type="button"
                  className="go-button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="project-info col-md-6 col-12">
            <div id="outer-links-container">
              <h2>{convertedProject.name} </h2>
              <div id="inner-links-container"> 
              {convertedProject.creatorId === 999 ? (
                <Link
                  id="edit-link"
                  to={`/edit-project/${this.props.match.params.id}`}
                >
                  Edit
                </Link>
              ) : null}
              {this.renderDeleteButton()}
              </div>
            </div>

            <div className="project-details">
              <p>
                by{" "}
                <Link to={`/users/${project.creatorId}?goback=true`}>
                  {project.user.firstname} {project.user.lastname}
                </Link>
              </p>
              <p>{convertedProject.description}</p>
              <p>
                <a href="https://github.com/michelle-pine/colab">
                  {convertedProject.githubLink}
                </a>
              </p>
              {convertedProject.prototypeLink !== "" ? (
                <p>
                  <a href="https://github.com/michelle-pine/colab">
                    {convertedProject.prototypeLink}
                  </a>
                </p>
              ) : null}

              <h3 id="position-header">
                Positions{" "}
                <HelpDialog message="The types of roles available for each project. You may apply for positions where the option is available." />
              </h3>

              {businessMembers.length !== 0 ||
              convertedProject.tags.indexOf(4) >= 0 ? (
                <div className="position-section">
                  <h4>Business</h4>
                  {businessMembers.map(member => {
                    return (
                      <Link
                        key={member.id}
                        to={`/users/${member.id}?goback=true`}
                      >
                        {member.firstname} {member.lastname} <br />
                      </Link>
                    );
                  })}
                  {convertedProject.tags.indexOf(4) >= 0 &&
                  convertedProject.creatorId !== 999 ? (
                    <button
                      className={
                        this.state.businessButtonText === APPLY
                          ? "go-button"
                          : "cancel-button"
                      }
                      onClick={this.handleApplyBusinessClicked}
                    >
                      {this.state.businessButtonText}
                    </button>
                  ) : (
                    this.renderAlternateState(convertedProject)
                  )}
                </div>
              ) : null}

              {backendMembers.length !== 0 ||
              convertedProject.tags.indexOf(2) >= 0 ? (
                <div className="position-section">
                  <h4>Back-end</h4>
                  {backendMembers.map(member => {
                    return (
                      <Link
                        key={member.id}
                        to={`/users/${member.id}?goback=true`}
                      >
                        {member.firstname} {member.lastname} <br />
                      </Link>
                    );
                  })}
                  {convertedProject.tags.indexOf(2) >= 0 &&
                  convertedProject.creatorId !== 999 ? (
                    <button
                      className={
                        this.state.backendButtonText === APPLY
                          ? "go-button"
                          : "cancel-button"
                      }
                      onClick={this.handleApplyBackendClicked}
                    >
                      {this.state.backendButtonText}
                    </button>
                  ) : (
                    this.renderAlternateState(convertedProject)
                  )}
                </div>
              ) : null}

              {frontendMembers.length !== 0 ||
              convertedProject.tags.indexOf(1) >= 0 ? (
                <div className="position-section">
                  <h4>Front-end</h4>
                  {frontendMembers.map(member => {
                    return (
                      <Link
                        key={member.id}
                        to={`/users/${member.id}?goback=true`}
                      >
                        {member.firstname} {member.lastname} <br />
                      </Link>
                    );
                  })}
                  {convertedProject.tags.indexOf(1) >= 0 &&
                  convertedProject.creatorId !== 999 ? (
                    <button
                      onClick={this.handleApplyFrontendClicked}
                      className={
                        this.state.frontendButtonText === APPLY
                          ? "go-button"
                          : "cancel-button"
                      }
                    >
                      {this.state.frontendButtonText}
                    </button>
                  ) : (
                    this.renderAlternateState(convertedProject)
                  )}
                </div>
              ) : null}

              {designMembers.length !== 0 ||
              convertedProject.tags.indexOf(3) >= 0 ? (
                <div className="position-section">
                  <h4>Design</h4>
                  {designMembers.map(member => {
                    return (
                      <Link
                        key={member.id}
                        to={`/users/${member.id}?goback=true`}
                      >
                        {member.firstname} {member.lastname} <br />
                      </Link>
                    );
                  })}
                  {convertedProject.tags.indexOf(3) >= 0 &&
                  convertedProject.creatorId !== 999 ? (
                    <button
                      onClick={this.handleApplyDesignClicked}
                      className={
                        this.state.designButtonText === APPLY
                          ? "go-button"
                          : "cancel-button"
                      }
                    >
                      {this.state.designButtonText}
                    </button>
                  ) : (
                    this.renderAlternateState(convertedProject)
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <div id="tags-container" className="project-tags col-md-6 col-12">
            {tagsCategories.map((category, i) => {
              let filteredTags = this.filterTagsByCategory(
                convertedProject.tagsRich,
                category
              );

              return (
                <div key={i}>
                  <h4 className="category-header">
                    {category} <HelpDialog message={helpDesc[category]} />
                  </h4>
                  {filteredTags.map(tag => {
                    return (
                      <Tag
                        tag={tag}
                        history={this.props.history}
                        key={tag.id}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
