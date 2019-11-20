import React from "react";
import PropTypes from "prop-types";
import "./MyProfile.scss";
import ProjectPreview from "../../components/ProjectPreview";
import HelpDialog from '../../components/HelpDialog/HelpDialog'
import store from "../../store/index";
import { userUtils } from "../../utils/user_utils";
import { updateDescription, updateLinks } from "../../actions/index";

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: true,
      editingDescription: false,
      editingLinks: false,
      currentProjects: [],
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
    if (this.state.editingDescription) {
      let payload = { description: this.state.description };
      store.dispatch(updateDescription(payload));
    }
    this.setState({ editingDescription: !this.state.editingDescription });
  };

  handleDescriptionChanged = event => {
    this.setState({ description: event.target.value });
  };

  handleEditLinksClicked = () => {
    if (this.state.editingLinks) {
      let payload = { links: this.state.links };
      store.dispatch(updateLinks(payload));
    }
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

    if (user.description) {
      this.setState({description: user.description})
    }

    if (user.links) {
      this.setState({links: user.links})
    }

    let current = []
    user.myProjectsExpanded.current.forEach(project => {
      current.push({
        id: project.id,
        projectName: project.name,
        projectCreator: store.getState().users[project.creatorId].firstname,
        timeCreated: project.createdAt
      })
    })

    let past = []
    user.myProjectsExpanded.past.forEach(project => {
      past.push({
        id: project.id,
        projectName: project.name,
        projectCreator: store.getState().users[project.creatorId].firstname,
        timeCreated: project.createdAt
      })
    })

    let pending = []
    user.myProjectsExpanded.pending.forEach(project => {
      pending.push({
        id: project.id,
        projectName: project.name,
        projectCreator: store.getState().users[project.creatorId].firstname,
        timeCreated: project.createdAt
      })
    })

    this.setState({
      currentProjects: current,
      pastProjects: past,
      pendingProjects: pending
    })
  }

  render() {
    if (!store.getState().user.loggedIn) {
      this.props.history.push("/login");
    }
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

        <div className="user-info">
          <h2>
            <i className="fa fa-user"></i>&nbsp;
            <span>{firstName} </span>
            <span>{lastName}</span>
          </h2>


          <div className="user-details">
           {/* mail */}
            <h3>Contact Info</h3>
            <a href={`mailto:${mail}`}><i className="fa fa-envelope"></i>&nbsp;{mail}</a>
            <div>
              <h3><label htmlFor="profile-description-textarea">User Description </label></h3>
              {editingDescription ? (
                <textarea
                  id="profile-description-textarea"
                  className="form-control"
                  onChange={this.handleDescriptionChanged}
                  value={description}
                ></textarea>
              ) : (
                <p id="profile-description-p">{description}</p>
              )}{" "}
              <button
                onClick={this.handleEditDescriptionClicked}
                className={editable ? "show edit-button go-button" : "hide edit-button go-button"}
              >
                {editingDescription ? "Done" : <div><i className="fa fa-pencil"></i>&nbsp;Edit Description</div>}
              </button>
            </div>



            {/* links */}
            <h3>Links <HelpDialog message="Enter comma separated links to personal websites, LinkedIn, or projects."/></h3>
            {editingLinks ? (
              <textarea
                value={links.toString()}
                className="form-control"
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
            <button
              onClick={this.handleEditLinksClicked}
              className={editable ? "show go-button edit-button" : "hide go-button edit-button"}
            >
              {editingLinks ? "Done" : <div><i className="fa fa-link"></i>&nbsp;Edit Links</div>}
            </button>
            <h3>Current Projects <HelpDialog message="Incomplete projects you are currently participating in."/></h3>
            <div className="project-preview-container">
              {currentProjects.length === 0
                ? emptyProjectsList
                : currentProjects.map((item, idx) => {
                    return <ProjectPreview key={idx} project={item} />;
                  })}
            </div>
            <h3>Past Projects <HelpDialog message="Complete projects you previously participated in. "/></h3>
            <div className="project-preview-container">
              {pastProjects.length === 0
                ? emptyProjectsList
                : pastProjects.map(item => {
                    return <ProjectPreview project={item} />;
                  })}
            </div>
            <h3>Pending Projects <HelpDialog message="Incomplete projects you have applied to."/></h3>
            <div className="project-preview-container">
              {pendingProjects.length === 0
                ? emptyProjectsList
                : pendingProjects.map(item => {
                    return <ProjectPreview project={item} />;
                  })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyProfile.defaultProps = {};

MyProfile.propTypes = {};

export default MyProfile;
