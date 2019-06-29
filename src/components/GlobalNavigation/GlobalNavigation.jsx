import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
            <input type="checkbox" name="navi-toggle" className="navigation__checkbox" id="navi-toggle" />
            <label htmlFor="navi-toggle" className="navigation__button">
                <span className="navigation__icon">&nbsp;</span>
            </label>
            <div className="navigation__background">&nbsp;</div>
            <nav className="navigation navigation__nav" id='global__nav'>
                <div className="row">
                    <svg className="just-be-weird-logo">
                        <use xlinkHref={"/assets/img/sprite.svg#icon-flickr4"}></use>
                    </svg>
                    <ul className="main-nav navigation__list js--main-nav">
                        <li className="navigation__item" onClick={e => clickHandler(e)}>
                            <Link className="navigation__link" to="/">Home</Link>
                        </li>
                        <li className="navigation__item" onClick={e => clickHandler(e)}>
                            <Link className="navigation__link" to="/about">About</Link>
                        </li>
                        <li className="navigation__item" onClick={e => clickHandler(e)}>
                            <Link className="navigation__link main-nav-box__experience"
                                to="/experience">Experience</Link>
                        </li>
                        <li className="navigation__item main-nav-box__infinite">
                            <Link className="navigation__link main-nav-box__infinite" to="/stones">
                                <svg className="main-nav-box__infinite-icon">
                                    <use xlinkHref="/assets/img/sprite.svg#icon-infinite"></use>
                                </svg>
                                Stones</Link>
                        </li>
                        <li className="navigation__item" onClick={e => clickHandler(e)}>
                            <Link className="navigation__link" to="/projects">Projects</Link>
                        </li>
                        <li className="navigation__item" onClick={e => clickHandler(e)}>
                            <Link className="navigation__link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <a href='/#' className="mobile-nav-icon js--nav-icon"><i className="ion-ios-menu"></i></a>
                </div>
            </nav>
        </Fragment>
    )
}
