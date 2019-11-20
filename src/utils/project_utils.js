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
    for (let memberId of project.projectMembers["back-end"]) {
      let user = state.users[memberId];
      user.id = memberId;
      backenders.push(user);
    }

    let frontenders = [];
    for (let memberId of project.projectMembers["front-end"]) {
      let user = state.users[memberId];
      user.id = memberId;
      frontenders.push(user);
    }

    let businessMen = [];
    for (let memberId of project.projectMembers["business"]) {
      let user = state.users[memberId];
      user.id = memberId;
      businessMen.push(user);
    }

    let designers = [];
    for (let memberId of project.projectMembers["design"]) {
      let user = state.users[memberId];
      user.id = memberId;
      designers.push(user);
    }

    projectMembers = {
      "back-end": backenders,
      "front-end": frontenders,
      "design": designers,
      "business": businessMen
    };

    let projectEdited = Object.assign({}, project);
    projectEdited.author = author;
    projectEdited.tagsRich = tags;
    projectEdited.projectMembersExpanded = projectMembers;

    return projectEdited;
  }
};
