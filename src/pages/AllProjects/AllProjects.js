import React from 'react';
import PropTypes from 'prop-types';
import './AllProjects.scss';
import { withRouter } from "react-router-dom";
import MultiSelect from "@khanacademy/react-multi-select";


//stores
import store from '../../store/index';

//utils
import { projectUtils } from '../../utils/project_utils';

//components
import ProjectCard from '../../components/ProjectCard/ProjectCard'

class AllProjects extends React.Component {
  constructor(props) {
    super(props);
    const storeTags = store.getState();
    const tags = Object.keys(storeTags.tags).map(function (key) {
      return { label: storeTags.tags[key]["name"] , value: key, type: storeTags.tags[key]["type"]};
    });
    this.state = {
      allProjects: store.getState().projects,
      selectedLanguages: [],
      selectedTechnologies: [],
      selectedPositions: [],
      selectedTopics: [],
      selectedDifficulty: [],
      languages: tags.filter((tag) => tag.type === "Languages"),
      technologies: tags.filter((tag) => tag.type === "Technologies"),
      positions: tags.filter((tag) => tag.type === "Positions"),
      topics: tags.filter((tag) => tag.type === "Topics"),
      difficulty: tags.filter((tag) => tag.type === "Difficulty"),
    }
    this.clearFilters = this.clearFilters.bind(this);
  }

  commonElements(arr1, arr2) {
    for (let tag of arr1) {
      if (arr2.indexOf(tag) < 0) {
        return false;
      }
    }
    return true;
  }

  renderProjects() {
    let projects = this.state.allProjects;
    let selectedTags = this.state.selectedPositions.concat(this.state.selectedLanguages).concat(this.state.selectedTechnologies).concat(this.state.selectedTopics).concat(this.state.selectedDifficulty);
    selectedTags = selectedTags.map((tag) => parseInt(tag));
    let renderedProjects = [];
    for (let i in projects) {
      if (selectedTags.length === 0 || this.commonElements(selectedTags, projects[i].tags)) {
        let curProject = projectUtils.convertProject(projects[i]);
        renderedProjects.push(
          <ProjectCard key={i} projectId={i} project={curProject} />
        );
      }
    }
    return renderedProjects;
  }

  clearFilters(e) {
    e.preventDefault();
    this.setState({
      selectedLanguages: [],
      selectedTechnologies: [],
      selectedPositions: [],
      selectedTopics: [],
      selectedDifficulty: [],
    });
  }

  render() {
    if (!store.getState().user.loggedIn) {
      this.props.history.push("/login");
    }
    return (
      <div className="all-projects">
        <div className="sidebar">
          <div className="sidebar-box">
            <h1>All Projects</h1>
            <h2><i className="fa fa-filter"></i>&nbsp; Project Filters</h2>
            <div className="filter positions">
              <div>Positions</div>
              <MultiSelect
                  options={this.state.positions}
                  selected={this.state.selectedPositions}
                  onSelectedChanged={function (selected) {
                    this.setState({selectedPositions: selected})
                  }.bind(this)}
                  overrideStrings={{
                    selectSomeItems: "Position Tags",
                    allItemsAreSelected: "All Items are Selected",
                    selectAll: "Select All",
                    search: "Search",
                }}
              />
            </div>
            <div className="filter languages">
              <div>Languages</div>
              <MultiSelect
                  options={this.state.languages}
                  selected={this.state.selectedLanguages}
                  onSelectedChanged={function (selected) {
                    this.setState({selectedLanguages: selected})
                  }.bind(this)}
                  overrideStrings={{
                    selectSomeItems: "Language Tags",
                    allItemsAreSelected: "All Items are Selected",
                    selectAll: "Select All",
                    search: "Search",
                }}
              />
            </div>
            <div className="filter technologies">
              <div>Technologies</div>
              <MultiSelect
                  options={this.state.technologies}
                  selected={this.state.selectedTechnologies}
                  onSelectedChanged={function (selected) {
                    this.setState({selectedTechnologies: selected})
                  }.bind(this)}
                  overrideStrings={{
                    selectSomeItems: "Technology Tags",
                    allItemsAreSelected: "All Items are Selected",
                    selectAll: "Select All",
                    search: "Search",
                }}
              />
            </div>
            <div className="filter topics">
              <div>Topics</div>
              <MultiSelect
                  options={this.state.topics}
                  selected={this.state.selectedTopics}
                  onSelectedChanged={function (selected) {
                    this.setState({selectedTopics: selected})
                  }.bind(this)}
                  overrideStrings={{
                    selectSomeItems: "Topic Tags",
                    allItemsAreSelected: "All Items are Selected",
                    selectAll: "Select All",
                    search: "Search",
                }}
              />
            </div>
            <div className="filter difficulty">
               <div>Difficulty</div>
              <MultiSelect
                  options={this.state.difficulty}
                  selected={this.state.selectedDifficulty}
                  onSelectedChanged={function (selected) {
                    this.setState({selectedDifficulty: selected})
                  }.bind(this)}
                  overrideStrings={{
                    selectSomeItems: "Difficulty Tags",
                    allItemsAreSelected: "All Items are Selected",
                    selectAll: "Select All",
                    search: "Search",
                }}
              />
            </div>
            <button onClick={this.clearFilters} className="back-button">Clear Filters</button>

          </div>
        </div>
        <div className="projects-container">
          {this.renderProjects()}
        </div>
      </div>
    );
  }
};

AllProjects.defaultProps = {

};

AllProjects.propTypes = {

};

export default withRouter(AllProjects);
