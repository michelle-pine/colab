import store from "../store/index";

export const userUtils = {
  convertUser: function() {
    let user = store.getState().user;
    let projects = store.getState().projects;

    let currentProjects = [];
    let userEdited = Object.assign({}, user);
    if (user.myProjects) {

      user.myProjects.current.forEach(application => {
        console.log(application)
        if(currentProjects.indexOf(projects[application.projectId]) < 0) {
          currentProjects.push(projects[application.projectId]);
        }
      })

      let pendingProjects = [];
      user.myProjects.pending.forEach(application => {
        if(pendingProjects.indexOf(projects[application.projectId]) < 0) {
          pendingProjects.push(projects[application.projectId]);
        }
      })

      let pastProjects = [];
      user.myProjects.past.forEach(application => {
        if(pastProjects.indexOf(projects[application.projectId]) < 0) {
          pastProjects.push(projects[application.projectId]);
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
