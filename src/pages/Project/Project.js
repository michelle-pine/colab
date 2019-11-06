import React from "react";
import PropTypes from "prop-types";
import "./Project.scss";
import store from "../../store/index";
import { projectUtils } from "../../utils/project_utils";
import Tag from "../../components/Tag/Tag";
import { Link } from "react-router-dom";

import { applyForProject, cancelApplication } from "../../actions/index";
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
  }
  getProject() {
    const { id } = this.props.match.params;
    let projects = store.getState().projects;
    return projects[id];
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

  render() {
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
      <div id="project-container" className="row">
        <div className="col-md-6 col-12">
          <Link to={`/`}>
            <i class="fa fa-arrow-left"></i> Back
          </Link>
          <h3>{convertedProject.name}</h3>
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

          <h3 id="position-header">Positions</h3>

          {businessMembers.length !== 0 ||
          convertedProject.tags.indexOf(4) >= 0 ? (
            <div className="position-section">
              <h4>Business</h4>
              {businessMembers.map(member => {
                return (
                  <p key={member.id}>
                    {member.firstname} {member.lastname}
                  </p>
                );
              })}
              {convertedProject.tags.indexOf(4) >= 0 ? (
                <button
                  className={
                    this.state.businessButtonText === APPLY
                      ? "go-button"
                      : "back-button"
                  }
                  onClick={this.handleApplyBusinessClicked}
                >
                  {this.state.businessButtonText}
                </button>
              ) : null}
            </div>
          ) : null}

          {backendMembers.length !== 0 ||
          convertedProject.tags.indexOf(2) >= 0 ? (
            <div className="position-section">
              <h4>Back-end</h4>
              {backendMembers.map(member => {
                return (
                  <p key={member.id}>
                    {member.firstname} {member.lastname}
                  </p>
                );
              })}
              {convertedProject.tags.indexOf(2) >= 0 ? (
                <button
                  className={
                    this.state.backendButtonText === APPLY
                      ? "go-button"
                      : "back-button"
                  }
                  onClick={this.handleApplyBackendClicked}
                >
                  {this.state.backendButtonText}
                </button>
              ) : null}
            </div>
          ) : null}

          {frontendMembers.length !== 0 ||
          convertedProject.tags.indexOf(1) >= 0 ? (
            <div className="position-section">
              <h4>Front-end</h4>
              {frontendMembers.map(member => {
                return (
                  <p key={member.id}>
                    {member.firstname} {member.lastname}
                  </p>
                );
              })}
              {convertedProject.tags.indexOf(1) >= 0 ? (
                <button
                  onClick={this.handleApplyFrontendClicked}
                  className={
                    this.state.frontendButtonText === APPLY
                      ? "go-button"
                      : "back-button"
                  }
                >
                  {this.state.frontendButtonText}
                </button>
              ) : null}
            </div>
          ) : null}

          {designMembers.length !== 0 ||
          convertedProject.tags.indexOf(3) >= 0 ? (
            <div className="position-section">
              <h4>Design</h4>
              {designMembers.map(member => {
                return (
                  <p key={member.id}>
                    {member.firstname} {member.lastname}
                  </p>
                );
              })}
              {convertedProject.tags.indexOf(3) >= 0 ? (
                <button
                  onClick={this.handleApplyDesignClicked}
                  className={
                    this.state.designButtonText === APPLY
                      ? "go-button"
                      : "back-button"
                  }
                >
                  {this.state.designButtonText}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
        <div id="tags-container" className="col-md-6 col-12">
          {tagsCategories.map((category, i) => {
            let filteredTags = this.filterTagsByCategory(
              convertedProject.tagsRich,
              category
            );

            return (
              <div key={i}>
                <h4 className="category-header">{category}</h4>
                {filteredTags.map(tag => {
                  return <Tag tag={tag} key={tag.id} />;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Project;
