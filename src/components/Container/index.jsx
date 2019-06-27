import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalNavigation from '../GlobalNavigation/GlobalNavigation'
import LandingPage from '../Landingpage/LandingPage';
import Routes from '../Routing/Routes'


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
                </header>

            </Router>
        </Fragment>
    )
}
