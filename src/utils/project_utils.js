import store from "../store/index";

export const projectUtils = {
  convertProject: function(project) {
    let state = store.getState();
    let allTags = state.tags;
    let tags = [];
    let author = state.users[project.creatorId];
    let projectMembers = {};

    for (let tag of project.tags) {
      let tagObj = allTags[tag];
      tagObj.id = tag;
      tags.push(tagObj);
    }
    tags = tags.sort(function(a, b) {
      if (a.type < b.type) {
        return -1;
      } else {
        return 1;
      }
    });

    let backenders = [];
    for (let memberId of project.projectMembers.backend) {
      backenders.push(state.users[memberId]);
    }

    let frontenders = [];
    for (let memberId of project.projectMembers.frontend) {
      frontenders.push(state.users[memberId]);
    }

    let businessMen = [];
    for (let memberId of project.projectMembers.business) {
      businessMen.push(state.users[memberId]);
    }

    let designers = [];
    for (let memberId of project.projectMembers.design) {
      designers.push(state.users[memberId]);
    }

    projectMembers = {
      backend: backenders,
      frontend: frontenders,
      design: designers,
      business: businessMen
    };

    let projectEdited = Object.assign({}, project);
    projectEdited.author = author;
    projectEdited.tagsRich = tags;
    projectEdited.projectMembersExpanded = projectMembers;

    return projectEdited;
  }
};
