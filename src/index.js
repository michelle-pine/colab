import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import './index.scss';

import AllProjects from './pages/AllProjects/AllProjects';
import CreateProject from './pages/CreateProject/CreateProject';
import MyProfile from './pages/MyProfile/MyProfile';
import Project from './pages/Project/Project';
import NotFound from './pages/NotFound/NotFound';


import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={AllProjects} />
      <Route path="/projects" component={AllProjects} />
      <Route path="/my-profile" component={MyProfile} />
      <Route path="/create-project" component={CreateProject} />
      <Route path="/edit-project" component={CreateProject} />
      <Route path="/projects/:id" component={Project} />
      <Route component={NotFound} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
