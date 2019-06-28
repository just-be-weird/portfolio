import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalNavigation from '../GlobalNavigation/GlobalNavigation'
import LandingPage from '../Landingpage/LandingPage';
import Routes from '../Routing/Routes'
import SocialAction from '../Socials/SocialAction'


export default function index() {
    return (
        <Fragment>
            <Router>
                <header id="home">
                    <GlobalNavigation />
                    <Switch>
                        <Route exact path='/' component={LandingPage} />
                        <Route component={Routes} />
                    </Switch>
                    <SocialAction />
                </header>

            </Router>
        </Fragment>
    )
}
