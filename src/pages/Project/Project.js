import React from "react";
import PropTypes from "prop-types";
import "./Project.scss";
import store from "../../store/index";
import { projectUtils } from "../../utils/project_utils";
import Tag from "../../components/Tag/Tag";

class Project extends React.Component {
  getProject() {
    const { id } = this.props.match.params;
    let projects = store.getState().projects;
    return projects[id];
  }

  filterTagsByCategory(tags, category) {
    return tags.filter(tag => tag.type === category);
  }

  render() {
    let project = this.getProject();
    let convertedProject = projectUtils.convertProject(project);
    console.log(convertedProject);
    let tagsCategories = [];

    convertedProject.tagsRich.forEach(tag => {
      if (tagsCategories.indexOf(tag.type) < 0) {
        tagsCategories.push(tag.type);
      }
    });

    return (
      <div id="project-container" className="row">
        <div className="col-md-6 col-12">
          <h3>{convertedProject.name}</h3>
          <p>{convertedProject.description}</p>
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
