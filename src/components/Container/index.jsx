import React, { Fragment, useEffect } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../axios.instance";
import GlobalNavigation from "../GlobalNavigation/GlobalNavigation";
import LandingPage from "../Landingpage/LandingPage";
import Routes from "../Routing/Routes";
import SocialAction from "../Socials/SocialAction";
import MultiActions from "../MultiActions/MultiActions";
import classes from "../Sass/main.module.scss";
import Footer from "./Layout/Footer";
import PropTypes from "prop-types";
import { logoutUser } from "../actions/auth";
import { cachedLogin } from "../actions/auth";
import { getProfile } from "../actions/profile";
import Loader from "../UI/Loader/Loader";
import ProfileSteps from "./Layout/ProfileSteps";

function Index({
    history,
    cachedLogin,
    getProfile,
    isAuthenticated,
    logoutUser,
}) {
    useEffect(() => {
        const token = localStorage.getItem("_htua_tkn");
        if (token) {
            const expairy = localStorage.getItem("_dtkn_exp");
            if (expairy && expairy * 1000 < Date.now()) {
                logoutUser();
            } else {
                axios.defaults.headers.common["Authorization"] = token;
                cachedLogin();
                getProfile(history);
            }
        }
        console.log("called");
    }, [cachedLogin, getProfile, history, logoutUser]);
    return (
        <Fragment>
            <header className={classes["section-header"]} id='home'>
                <GlobalNavigation />
            </header>
            <Switch>
                {!isAuthenticated ? (
                    <Route exact path='/' component={LandingPage} />
                ) : (
                    <Route exact path='/' component={ProfileSteps} />
                )}

                <Route component={Routes} />
            </Switch>
            <MultiActions />
            <SocialAction />
            <Loader />
            <Footer />
        </Fragment>
    );
}
Index.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    getProfile: PropTypes.func,
    cachedLogin: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(
    mapStateToProps,
    { cachedLogin, logoutUser, getProfile }
)(withRouter(Index));
