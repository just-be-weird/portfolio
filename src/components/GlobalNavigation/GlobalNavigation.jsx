import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import classes from '../Sass/main.module.scss';
import {isMobile} from '../Shared/Util';

const GlobalNavigation = ({data: navData, isAuthenticated, location}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      let scrollDirection = 0;
      window.addEventListener('scroll', () => {
        let winTop = window.scrollY,
          global__nav = document.getElementById('global__nav');
        if (winTop > scrollDirection) {
          if (winTop > global__nav.scrollHeight + 10) {
            global__nav.classList.add(classes.sticky);
          } else {
            global__nav.classList.remove(classes.sticky);
            scrollDirection = window.scrollY;
          }
        } else {
          global__nav.classList.remove(classes.sticky);
          scrollDirection = window.scrollY;
          return false;
        }
        scrollDirection = winTop;
      });
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated && isMobile && location.pathname !== '/') {
      inputRef.current.checked = true;
    }
  });

  const clickHandler = (e) => {
    e.preventDefault();
    inputRef.current.checked = false;
  };

  const jsx =
    navData.length > 0 &&
    navData.map(({id, nav_class, svg_icon, svg, nav_title}) => {
      return (
        <li
          key={id}
          className={
            classes['navigation__item'] +
            (nav_class.length > 0 ? ' ' + classes[nav_class] : '')
          }
          onClick={clickHandler}
        >
          <Link
            className={
              classes['navigation__link'] +
              (nav_class.length > 0 ? ' ' + classes[nav_class] : '')
            }
            id={id}
            to={id === 'home' ? '/' : id}
          >
            {svg && (
              <svg className={classes[`${nav_class}-icon`]}>
                <use xlinkHref={svg_icon}/>
              </svg>
            )}
            {nav_title}
          </Link>
        </li>
      )
    });
  return (
    <>
      <input type='checkbox' name='navi-toggle' className={classes['navigation__checkbox']} ref={inputRef}
             id='navi-toggle'/>
      {isAuthenticated && (
        <>
          <label htmlFor='navi-toggle' className={classes['navigation__button']}>
            <span className={classes['navigation__icon']}>&nbsp;</span>
          </label>
          <div className={classes['navigation__background']}>&nbsp;</div>
        </>
      )}
      <nav className={classes['navigation'] + ' ' + classes['navigation__nav']} id='global__nav'
           style={!isAuthenticated && isMobile ? {'height': 'auto'} : null}>
        <div className={classes['row']}>
          <Link to={'/'}>
            <svg className={classes['just-be-weird-logo']} onClick={() => {
              if (!isAuthenticated && isMobile && location.pathname !== '/') {
                inputRef.current.checked = false
              }
            }}>
              <use xlinkHref={'/assets/img/sprite.svg#icon-flickr4'}/>
            </svg>
          </Link>
          <ul className={classes['main-nav'] + ' ' + classes['navigation__list']}>
            {isAuthenticated && jsx}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default GlobalNavigation;
