import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalNavigation from '../GlobalNavigation/GlobalNavigation'
import LandingPage from '../Landingpage/LandingPage';
import Routes from '../Routing/Routes'
import SocialAction from '../Socials/SocialAction'
import MultiActions from '../MultiActions/MultiActions'
import classes from '../Sass/main.module.scss'


export default function index() {
    return (
        <Fragment>
            <Router>
                <header className={classes['section-header']} id="home">
                    <GlobalNavigation />
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route component={Routes} />
                    </Switch>
                    <SocialAction />
                    <MultiActions />
                </header>
            </Router>
        </Fragment>
    )
}
