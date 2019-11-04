import React from "react";
import PropTypes from "prop-types";
import "./MyProfile.scss";
import ProjectPreview from "../../components/ProjectPreview";

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
          profileData: "",
          timeCreated: "Just now"
        }
      ],
      pastProjects: [],
      presentProjects: [],
      links: [
        "https://github.com/michelle-pine/colab",
        "https://github.com/michelle-pine/colab"
      ],
      firstName: "John",
      lastName: "Snow",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      mail: "snow.j@gmail.com"
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

  render() {
    const emptyProjectsList = <p> No projects yet.</p>;
    const {
      currentProjects,
      pastProjects,
      presentProjects,
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
            {editingDescription ? "Done" : "Edit"}
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
          {editingLinks ? "Done" : "Edit"}
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
          {presentProjects.length === 0
            ? emptyProjectsList
            : presentProjects.map(item => {
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
