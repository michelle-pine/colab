import store from '../store/index';

export const projectUtils = {
  convertProject: function(project) {
    let state = store.getState();
    let allTags = state.tags;
    let tags = [];
    let author = state.users[project.creatorId];
    for (let tag of project.tags) {
      tags.push(allTags[tag]);
    }
    tags = tags.sort(function(a, b) {
      if (a.type < b.type) {
        return -1;
      } else {
        return 1;
      }
    });
    let projectEdited = Object.assign({}, project);
    projectEdited.author = author;
    projectEdited.tagsRich = tags;
    return projectEdited;
  },
}