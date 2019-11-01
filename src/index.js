import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

//pages
import AllProjects from './pages/AllProjects/AllProjects';
import CreateProject from './pages/CreateProject/CreateProject';
import MyProfile from './pages/MyProfile/MyProfile';
import Project from './pages/Project/Project';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';

//components
import Navbar from './components/Navbar/Navbar';

import * as serviceWorker from './serviceWorker';

const routing = (
  <div className="page-wrapper">
  <Router>
    <Navbar />
    <div>
      <Route exact path="/" component={AllProjects} />
      <Route path="/my-profile" component={MyProfile} />
      <Route path="/create-project" component={CreateProject} />
      <Route path="/edit-project" component={CreateProject} />
      <Route path="/projects/:id" component={Project} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </div>
  </Router>
  </div>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
