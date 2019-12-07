import React, {Fragment, useEffect} from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from '../../axios.instance';
import GlobalNavigation from '../GlobalNavigation/GlobalNavigation';
import UserAuthPage from '../UserAuthPage/UserAuthPage';
import Routes from '../Routing/Routes';
import SocialAction from '../Socials/SocialAction';
import MultiActions from '../MultiActions/MultiActions';
import classes from '../Sass/main.module.scss';
import Footer from './Layout/Footer';
import PropTypes from 'prop-types';
import {cachedLogin, logoutUser} from '../actions/auth';
import {clearUIErrors} from '../actions/ui';
import Loader from '../UI/Loader/Loader';
import Notificaton from '../UI/Notification/Notificaton';
import About from './Layout/About';

function Index({cachedLogin, clearUIErrors, errors, history, isAuthenticated, isloading, logoutUser}) {
  const data = [
    {
      id: 'home',
      nav_title: 'Home',
      nav_to: '#',
      nav_class: '',
      svg: false
    },
    {
      id: 'about',
      nav_title: 'About',
      nav_to: '#about',
      nav_class: '',
      svg: false
    },
    {
      id: 'experience',
      nav_title: 'Experience',
      nav_class: '',
      nav_to: '#experience',
      svg: false
    },
    {
      id: 'stones',
      nav_title: 'Stones',
      nav_to: '#stones',
      nav_class: 'main-nav-box__infinite',
      svg: true,
      svg_icon: '/assets/img/sprite.svg#icon-infinite'
    },
    {
      id: 'projects',
      nav_title: 'Projects',
      nav_to: '#projects',
      svg: false,
      nav_class: ''
    },
    {
      id: 'contact',
      nav_title: 'Contact',
      nav_to: '#contact',
      nav_class: ''
    }
  ];

  useEffect(
    () => {
      const token = localStorage.getItem('_htua_tkn');
      if (token) {
        const expairy = localStorage.getItem('_dtkn_exp');
        if (expairy && expairy * 1000 < Date.now()) {
          logoutUser(history);
        } else {
          axios.defaults.headers.common['Authorization'] = token;
          cachedLogin();
        }
      }
    },
    [cachedLogin, history, logoutUser]
  );

  const clickHandler = (e) => {
    e.preventDefault();
    clearUIErrors();
  };
  return (
    <Fragment>
      <header className={classes['section-header']} id='home'>
        <GlobalNavigation data={data} isAuthenticated={isAuthenticated} location={history.location}/>
      </header>
      <SocialAction/>

      {errors && <Notificaton clicked={clickHandler}/>}
      <Switch>
        {!isAuthenticated ? <Route exact path='/' component={UserAuthPage}/> : <Route component={Routes}/>}
        <Route excat to='/about' component={About}/>
      </Switch>
      <MultiActions history={history}/>
      <Loader isloading={isloading}/>
      <Footer/>
    </Fragment>
  );
}

Index.propTypes = {
  cachedLogin: PropTypes.func.isRequired,
  clearUIErrors: PropTypes.func.isRequired,
  errors: PropTypes.object,
  isloading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.ui.errors,
  isloading: state.ui.loading
});
export default connect(mapStateToProps, {cachedLogin, clearUIErrors, logoutUser})(withRouter(Index));
