import React from "react";
import PropTypes from "prop-types";
import "./MyProfile.scss";
import ProjectPreview from "../../components/ProjectPreview";
import store from "../../store/index";
import { userUtils } from "../../utils/user_utils";

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: true,
      editingDescription: false,
      editingLinks: false,
      currentProjects: [
        {
          projectName: "Chore Chart",
          projectCreator: "Greg",
          timeCreated: "Just now"
        }
      ],
      pastProjects: [],
      pendingProjects: [],
      links: [],
      firstName: store.getState().user.firstname,
      lastName: store.getState().user.lastname,
      description: "",
      mail: store.getState().user.username
    };
  }

  handleEditDescriptionClicked = () => {
    this.setState({ editingDescription: !this.state.editingDescription });
  };

  handleDescriptionChanged = event => {
    this.setState({ description: event.target.value });
  };

  handleEditLinksClicked = () => {
    this.setState({
      editingLinks: !this.state.editingLinks
    });
  };

  handleLinksChanged = event => {
    this.setState({
      links: event.target.value.split(",")
    });
  };

  componentDidMount() {
    let user = userUtils.convertUser();

    let current = []
    user.myProjectsExpanded.current.forEach(project => {
      current.push({
        projectName: project.name,
        projectCreator: store.getState().users[project.creatorId].firstname,
        timeCreated: project.timeCreated
      })
    })

    let past = []
    user.myProjectsExpanded.past.forEach(project => {
      past.push({
        projectName: project.name,
        projectCreator: store.getState().users[project.creatorId].firstname,
        timeCreated: project.timeCreated
      })
    })

    let pending = []
    user.myProjectsExpanded.pending.forEach(project => {
      pending.push({
        projectName: project.name,
        projectCreator: store.getState().users[project.creatorId].firstname,
        timeCreated: project.timeCreated
      })
    })

    this.setState({
      currentProjects: current,
      pastProjects: past,
      pendingProjects: pending
    })

  }

  render() {

    const emptyProjectsList = <p> No projects yet.</p>;
    const {
      currentProjects,
      pastProjects,
      pendingProjects,
      links,
      firstName,
      lastName,
      description,
      mail,
      editable,
      editingDescription,
      editingLinks
    } = this.state;


    return (
      <div id="profile-page">
        {/* First and last Name */}
        <h4>
          <span>{firstName} </span>
          <span>{lastName}</span>
        </h4>

        {/* description */}
        <div>
          {editingDescription ? (
            <textarea
              id="profile-description-textarea"
              onChange={this.handleDescriptionChanged}
              value={description}
            ></textarea>
          ) : (
            <p id="profile-description-p">{description}</p>
          )}{" "}
          <p
            onClick={this.handleEditDescriptionClicked}
            className={editable ? "show edit-button" : "hide edit-button"}
          >
            {editingDescription ? "Done" : "Edit Description"}
          </p>
        </div>

        {/* mail */}
        <p>{mail}</p>

        {/* links */}
        <h3>Links</h3>
        {editingLinks ? (
          <textarea
            value={links.toString()}
            onChange={this.handleLinksChanged}
            id="links-textarea"
          >
            {links.toString()}
          </textarea>
        ) : (
          links.map((link, idx) => {
            return (
              <a key={idx} className="profile-link" href={link}>
                {link}{" "}
              </a>
            );
          })
        )}
        <p
          onClick={this.handleEditLinksClicked}
          className={editable ? "show edit-button" : "hide edit-button"}
        >
          {editingLinks ? "Done" : "Edit Links"}
        </p>

        {/* projects */}
        <h3>Current Projects</h3>
        <div className="project-preview-container">
          {currentProjects.length === 0
            ? emptyProjectsList
            : currentProjects.map((item, idx) => {
                return <ProjectPreview key={idx} project={item} />;
              })}
        </div>
        <h3>Past Projects</h3>
        <div className="project-preview-container">
          {pastProjects.length === 0
            ? emptyProjectsList
            : pastProjects.map(item => {
                return <ProjectPreview project={item} />;
              })}
        </div>
        <h3>Pending Projects</h3>
        <div className="project-preview-container">
          {pendingProjects.length === 0
            ? emptyProjectsList
            : pendingProjects.map(item => {
                return <ProjectPreview project={item} />;
              })}
        </div>
      </div>
    );
  }
}

MyProfile.defaultProps = {};

MyProfile.propTypes = {};

export default MyProfile;
