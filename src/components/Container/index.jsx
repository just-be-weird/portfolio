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
import { cachedLogin, logoutUser } from "../actions/auth";
import { clearUIErrors } from "../actions/ui";
import { getProfile } from "../actions/profile";
import Loader from "../UI/Loader/Loader";
import ProfileSteps from "./Layout/ProfileSteps";
import Notificaton from "../UI/Notification/Notificaton";

function Index({
    cachedLogin,
    clearUIErrors,
    errors,
    getProfile,
    history,
    isAuthenticated,
    isloading,
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
                getProfile();
                history.push('/step/1');
            }
        }
    }, [cachedLogin, getProfile, history, logoutUser]);

    const clickHandler = e => {
        e.preventDefault();
        clearUIErrors();
    };
    return (
        <Fragment>
            <header className={classes["section-header"]} id='home'>
                <GlobalNavigation />
            </header>
            {errors && <Notificaton clicked={clickHandler} />}
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
            <Loader isloading={isloading} />
            <Footer />
        </Fragment>
    );
}
Index.propTypes = {
    cachedLogin: PropTypes.func.isRequired,
    clearUIErrors: PropTypes.func.isRequired,
    errors: PropTypes.object,
    getProfile: PropTypes.func.isRequired,
    isloading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.ui.errors,
    isloading: state.ui.loading,
});
export default connect(
    mapStateToProps,
    { cachedLogin, clearUIErrors, logoutUser, getProfile }
)(withRouter(Index));
