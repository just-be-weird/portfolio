import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalNavigation from '../GlobalNavigation/GlobalNavigation'
import LandingPage from '../Landingpage/LandingPage';
import Routes from '../Routing/Routes'
import SocialAction from '../Socials/SocialAction'
import MultiActions from '../MultiActions/MultiActions'
import classes from '../Sass/main.module.scss'
import Footer from './Layout/Footer';
import Loader from '../UI/Loader/Loader';


export default function index() {
    return (
        <Fragment>
            <Router>
                <header className={classes['section-header']} id="home">
                    <GlobalNavigation />
                </header>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route component={Routes} />
                </Switch>
                <MultiActions />
                <SocialAction />
                {/* <Loader /> */}
                <Footer />
            </Router>
        </Fragment>
    )
}
