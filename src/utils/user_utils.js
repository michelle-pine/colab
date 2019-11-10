import store from "../store/index";

export const userUtils = {
  convertUser: function() {
    let user = store.getState().user;
    let projects = store.getState().projects;

    let currentProjects = [];
    let userEdited = Object.assign({}, user);
    if (user.myProjects) {

      user.myProjects.current.forEach(application => {
        if(currentProjects.indexOf(projects[application.projectId]) < 0) {
          let project = projects[application.projectId];
          project.id = application.projectId;
          currentProjects.push(project);
        }
      })

      let pendingProjects = [];
      user.myProjects.pending.forEach(application => {
        if(pendingProjects.indexOf(projects[application.projectId]) < 0) {
          let project = projects[application.projectId];
          project.id = application.projectId;
          pendingProjects.push(project);
        }
      })

      let pastProjects = [];
      user.myProjects.past.forEach(application => {
        if(pastProjects.indexOf(projects[application.projectId]) < 0) {
          let project = projects[application.projectId];
          project.id = application.projectId;
          pastProjects.push(project);
        }
      })

      let myProjectsExpanded = {
        current: currentProjects,
        past: pastProjects,
        pending: pendingProjects
      }

      userEdited.myProjectsExpanded = myProjectsExpanded;
    }
    return userEdited;
  }
};
