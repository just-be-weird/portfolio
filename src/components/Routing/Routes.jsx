import React from 'react';
import {Route, Switch} from 'react-router-dom';
import About from '../Container/Layout/About';
import Experience from '../Container/Layout/Experience';
import InfinityStones from '../Container/Layout/InfinityStones';
import Projects from '../Container/Layout/Projects';
import ProfileSteps from '../Container/Layout/ProfileSteps';
import AddExperience from '../ProfileBuilder/AddExperience';
import AddEducation from '../ProfileBuilder/AddEducation';
import Contact from '../Container/Layout/Contact';
import NotFound from '../NotFound/NotFound';
import classes from '../Sass/main.module.scss';
import PrivateRoute from './PrivateRoute';
import Portfolios from '../Portfolio/Portfolios';
import UserPortfolio from '../Portfolio/UserPortfolio';

export default function Routes() {
  return (
    <div className={classes.container}>
      <Switch>
        <PrivateRoute exact path='/' component={UserPortfolio}/>
        <PrivateRoute exact path='/edit-profile' component={ProfileSteps}/>
        <PrivateRoute exact path='/add-experience' component={AddExperience}/>
        <PrivateRoute exact path='/add-education' component={AddEducation}/>
        <PrivateRoute exact path='/portfolio/:userHandle' component={UserPortfolio}/>
        <Route exact path='/creator' component={About}/>
        <Route exact path='/experience' component={Experience}/>
        <Route exact path='/stones' component={InfinityStones}/>
        <Route exact path='/projects' component={Projects}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/portfolios' component={Portfolios}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}
