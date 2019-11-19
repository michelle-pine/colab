import React from 'react';
import PropTypes from 'prop-types';
import './UserProfile.scss';
import ProjectPreview from "../../components/ProjectPreview";
import HelpDialog from '../../components/HelpDialog/HelpDialog'
import store from "../../store/index";
import MyProfile from '../../pages/MyProfile/MyProfile';

class UserProfile extends React.Component {
  getUser() {
    const { id } = this.props.match.params;
    let users = store.getState().users;
    return users[id];
  }

  convertProjects(projectIds, user) {
    let allProjects = store.getState().projects;
    let newProjects = projectIds.map(function(id) {
        let project = allProjects[id];
        return {
          id: id,
          projectName: project.name,
          projectCreator: user.firstname,
          timeCreated: project.createdAt
      }});
    return newProjects;
  }

  renderBackButton() {
    const goBack = this.props.location.search.includes("goback");
    if (goBack) {
      return (
        <a className="back-link" onClick={this.goBack} href="#">
          <i className="fa fa-chevron-left"></i> Back
        </a>
      );
    } else {
      return null;
    }
  }
  
  renderOtherUser() {
    let user = this.getUser();
    return (
      <div id="profile-page">
        {this.renderBackButton()}
        <div className="user-info">
          <h2>
            <i className="fa fa-user"></i>&nbsp;
            <span>{user.firstname} </span>
            <span>{user.lastname}</span>
          </h2>


          <div className="user-details">
           {/* mail */}
            <h3>Contact Info</h3>
            <a href={`mailto:${user.email}`}><i className="fa fa-envelope"></i>&nbsp;{user.email}</a>
            <h3>User Description</h3>
            <div>
              {user.description}
            </div>
            <h3>Current Projects <HelpDialog message="Incomplete projects this user is currently participating in."/></h3>
                <div className="project-preview-container">
                  {this.convertProjects(user.myProjects.current, user).map(item => {
                        return <ProjectPreview project={item} />;
                      })}
                </div>
                <h3>Past Projects <HelpDialog message="Complete projects this user previously participated in. "/></h3>
                <div className="project-preview-container">
                  {this.convertProjects(user.myProjects.past, user).map(item => {
                          return <ProjectPreview project={item} />;
                        })}
                </div>
                <h3>Pending Projects <HelpDialog message="Incomplete projects this user has applied to."/></h3>
                <div className="project-preview-container">
                {this.convertProjects(user.myProjects.pending, user).map(item => {
                        return <ProjectPreview project={item} />;
                      })}
                </div>
            </div>
          </div>
      </div>
    );
  }

  render() {
    const { id } = this.props.match.params;
    if (id === "999") {
      return <MyProfile />
    }
    else {
      return this.renderOtherUser();
    }
  }
};

UserProfile.defaultProps = {

};

UserProfile.propTypes = {

};

export default UserProfile;
