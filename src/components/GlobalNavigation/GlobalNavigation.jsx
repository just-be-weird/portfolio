import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classes from '../Sass/main.module.scss';

export default function GlobalNavigation() {
    useEffect(() => {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            let scrollDirection = 0;
            window.addEventListener('scroll', (e) => {
                let winTop = window.scrollY,
                    global__nav = document.getElementById("global__nav");
                if (winTop > scrollDirection) {
                    if (winTop > global__nav.scrollHeight + 10) {
                        global__nav.classList.add("sticky");
                    } else {
                        global__nav.classList.remove("sticky");
                        scrollDirection = window.scrollY;
                    }
                } else {
                    global__nav.classList.remove("sticky");
                    scrollDirection = window.scrollY;
                    return false;
                }
                scrollDirection = winTop;
            })
        }
    }, [])

    const clickHandler = e => {
        e.preventDefault();
        document.getElementById("navi-toggle").checked = false;
    }

    return (
        <Fragment>
            <input type="checkbox" name="navi-toggle" className={classes["navigation__checkbox"]} id="navi-toggle" />
            <label htmlFor="navi-toggle" className={classes["navigation__button"]}>
                <span className={classes["navigation__icon"]}>&nbsp;</span>
            </label>
            <div className={classes["navigation__background"]}>&nbsp;</div>
            <nav className={classes["navigation"]+" "+classes["navigation__nav"]} id='global__nav'>
                <div className={classes["row"]}>
                    <svg className={classes["just-be-weird-logo"]}>
                        <use xlinkHref={"/assets/img/sprite.svg#icon-flickr4"}></use>
                    </svg>
                    <ul className={classes["main-nav"]+" "+classes["navigation__list"]}>
                        <li className={classes["navigation__item"]} onClick={e => clickHandler(e)}>
                            <Link className={classes["navigation__link"]} to="/">Home</Link>
                        </li>
                        <li className={classes["navigation__item"]} onClick={e => clickHandler(e)}>
                            <Link className={classes["navigation__link"]} to="/about">About</Link>
                        </li>
                        <li className={classes["navigation__item"]} onClick={e => clickHandler(e)}>
                            <Link className={classes["navigation__link"]+" "+["main-nav-box__experience"]}
                                to="/experience">Experience</Link>
                        </li>
                        <li className={classes["navigation__item"]+" "+classes["main-nav-box__infinite"]} onClick={e => clickHandler(e)}>
                            <Link className={classes["navigation__link"]+" "+classes["main-nav-box__infinite"]} to="/stones">
                                <svg className={classes["main-nav-box__infinite-icon"]}>
                                    <use xlinkHref="/assets/img/sprite.svg#icon-infinite"></use>
                                </svg>
                                Stones</Link>
                        </li>
                        <li className={classes["navigation__item"]} onClick={e => clickHandler(e)}>
                            <Link className={classes["navigation__link"]} to="/projects">Projects</Link>
                        </li>
                        <li className={classes["navigation__item"]} onClick={e => clickHandler(e)}>
                            <Link className={classes["navigation__link"]} to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    )
}
