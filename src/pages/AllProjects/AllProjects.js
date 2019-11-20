import React from 'react';
import './AllProjects.scss';
import { withRouter } from "react-router-dom";
import MultiSelect from "@khanacademy/react-multi-select";


//stores
import store from '../../store/index';

//utils
import { projectUtils } from '../../utils/project_utils';

//components
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import HelpDialog from '../../components/HelpDialog/HelpDialog'

class AllProjects extends React.Component {
  constructor(props) {
    super(props);
    const storeTags = store.getState();
    const tags = Object.keys(storeTags.tags).map(function (key) {
      return { label: storeTags.tags[key]["name"] , value: key, type: storeTags.tags[key]["type"]};
    });
    this.onTagClick = this.onTagClick.bind(this);
    this.onSelectId = this.onSelectId.bind(this);
  
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
      searchValue: "",
    }
    this.clearFilters = this.clearFilters.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSelectId = this.onSelectId.bind(this);
 
  }

  componentDidMount() {
    let query = this.props.location.search

    if (query) {
      const id = query.substring(5,query.length);
      this.onSelectId(id);
    }
  }

  anySelections() {
    return this.state.selectedDifficulty.length > 0 || this.state.selectedLanguages.length > 0 || this.state.selectedPositions.length > 0 || this.state.selectedTechnologies.length > 0 || this.state.selectedTopics.length > 0;
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      console.log("updated");
      let query = this.props.location.search
      
      if (query && query.substring(5,query.length) === "none") {
        this.setState({
          selectedLanguages: [],
          selectedTechnologies: [],
          selectedPositions: [],
          selectedTopics: [],
          selectedDifficulty: [],
          searchValue: "",
        });
      }
    }
  }

  commonElements(arr1, arr2) {
    for (let tag of arr1) {
      if (arr2.indexOf(tag) < 0) {
        return false;
      }
    }
    return true;
  }

  onSearch(e) {
    let val = e.target.value;
    this.props.history.push(`/`);
    this.setState({searchValue: val});
  }

  searchTag(tags, regex) {
    for (let tag of tags) {
      if (tag.name.toUpperCase().match(regex))
        return true;
    }
    return false;
  }

  matchesSearch(name, description, author, tags) {
    let specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";

    let nameUpper = name.toUpperCase();
    let descriptionUpper = description.toUpperCase();
    let authorUpper = author.toUpperCase();
    let string2 = this.state.searchValue.toUpperCase();
    for (var i = 0; i < specialChars.length; i++) {
      string2 = string2.replace(new RegExp("\\" + specialChars[i], "gi"), "");
    }
    let regex = new RegExp( string2, 'g' );
    let matchesName = nameUpper.match(regex);
    let matchesDescription = descriptionUpper.match(regex);
    let matchesAuthor = authorUpper.match(regex);
    let matchesTag = this.searchTag(tags, regex);
    return matchesName || matchesDescription || matchesAuthor || matchesTag;
  }

  hasId(tags, id) {
    let matching = tags.filter(tag => tag.value === `${id}`);
    return matching.length > 0;
  }

  onSelectId(id) {
    this.props.history.push(`/?tag=${id}`)
    let positions = [];
    let languages = [];
    let technologies = [];
    let topics = [];
    let difficulty = [];
    if (this.hasId(this.state.positions, id)) {
      positions.push(id);
    }
    else if (this.hasId(this.state.languages, id)) {
      languages.push(id);
    }
    else if (this.hasId(this.state.technologies, id)) {
      technologies.push(id);
    }
    else if (this.hasId(this.state.topics, id)) {
      topics.push(id);
    }
    else if (this.hasId(this.state.difficulty, id)) {
      console.log(id)
      difficulty.push(id);
    }

    this.setState({selectedLanguages: languages,
      selectedTechnologies: technologies,
      selectedPositions: positions,
      selectedTopics: topics,
      selectedDifficulty: difficulty});

  }

  onTagClick(e) {
    let id = e.target.getAttribute('data-id');
    this.onSelectId(id);
  }

  renderProjects() {
    let projectsObj = store.getState().projects;
    let selectedTags = this.state.selectedPositions.concat(this.state.selectedLanguages).concat(this.state.selectedTechnologies).concat(this.state.selectedTopics).concat(this.state.selectedDifficulty);
    selectedTags = selectedTags.map((tag) => parseInt(tag));
    let projects = [];
    for (let i in projectsObj) {
      let project = Object.assign({}, projectsObj[i]);
      project.id = i;
      projects.push(project);
    }
    projects = projects.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
    let renderedProjects = [];
    for (let i = 0; i < projects.length; i++) {
      if (selectedTags.length === 0 || this.commonElements(selectedTags, projects[i].tags) ) {
        let curProject = projectUtils.convertProject(projects[i]);
        if (this.state.searchValue === "" || this.matchesSearch(curProject.name, curProject.description, curProject.author.firstname + curProject.author.lastname, curProject.tagsRich)) {
          renderedProjects.push(
            <ProjectCard onTagClick={this.onTagClick} key={i} projectId={projects[i].id} project={curProject} />
          );
        }
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
      searchValue: "",
    });
    this.searchBox.value = "";
  }

  render() {
    if (!store.getState().user.loggedIn) {
      this.props.history.push("/login");
    }
    let projects = this.renderProjects();
    if (projects.length === 0) {
      projects = <h3>No projects found.</h3>
    }
    return (
      <div className="all-projects">
        <div className="sidebar">
          <div className="sidebar-box">
            <h1>All Projects</h1>
            <div className="form-group search">
              <label htmlFor="search-box" className="sr-only">Search</label>
              <i className="search-icon fa fa-search"></i>
              <input ref={el => this.searchBox = el} onChange={this.onSearch} id="search-box" className="form-control" placeholder="Search Projects..."/>
            </div>
            <h2><i className="fa fa-filter"></i>&nbsp; Project Filters <HelpDialog message="Use these filters to narrow down results." /></h2>
            <div className="filter positions">
              <div>Positions <HelpDialog message="The types of roles available for each project."/></div>
              <MultiSelect
                  options={this.state.positions}
                  selected={this.state.selectedPositions}
                  onSelectedChanged={function (selected) {
                    this.setState({selectedPositions: selected})
                    this.props.history.push(`/`);
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
              <div>Languages <HelpDialog message="The coding languages used to implement a project (i.e. Java, Python, Javascript)."/></div>
              <MultiSelect
                  options={this.state.languages}
                  selected={this.state.selectedLanguages}
                  onSelectedChanged={function (selected) {
                    this.setState({selectedLanguages: selected})
                    this.props.history.push(`/`);
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
              <div>Technologies <HelpDialog message="The non-coding language technologies used to implement a project."/></div>
              <MultiSelect
                  options={this.state.technologies}
                  selected={this.state.selectedTechnologies}
                  onSelectedChanged={function (selected) {
                    this.setState({selectedTechnologies: selected})
                    this.props.history.push(`/`);
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
              <div>Topics <HelpDialog message="The genre of application of a project."/></div>
              <MultiSelect
                  options={this.state.topics}
                  selected={this.state.selectedTopics}
                  onSelectedChanged={function (selected) {
                    this.setState({selectedTopics: selected})
                    this.props.history.push(`/`);
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
               <div>Difficulty  <HelpDialog message="The proficiency level in coding/design/business required to complete a project."/></div>
              <MultiSelect
                  options={this.state.difficulty}
                  selected={this.state.selectedDifficulty}
                  onSelectedChanged={function (selected) {
                    this.setState({selectedDifficulty: selected})
                    this.props.history.push(`/`);
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
          {projects}
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
