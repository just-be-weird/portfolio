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
    const data = [
        {
            id: "home",
            nav_title: "Home",
            nav_to: "/",
            nav_class: "",
            svg: false
        }
        , {
            id: "about",
            nav_title: "About",
            nav_to: "/about",
            nav_class: "",
            svg: false
        }
        , {
            id: "experience",
            nav_title: "Experience",
            nav_class: "",
            nav_to: "/experience",
            svg: false
        }
        , {
            id: "stones",
            nav_title: "Stones",
            nav_to: "/stones",
            nav_class: "main-nav-box__infinite",
            svg: true,
            svg_icon: "/assets/img/sprite.svg#icon-infinite"
        }
        , {
            id: "projects",
            nav_title: "Projects",
            nav_to: "/projects",
            svg: false,
            nav_class: ""
        }
        , {
            id: "contact",
            nav_title: "Contact",
            nav_to: "/contact",
            nav_class: ""
        }
    ];

    const jsx = (
        data.length > 0 && data.map(nav_item => (
            <li key={nav_item.id} className={classes["navigation__item"] + (nav_item.nav_class.length > 0 ? " " + classes[nav_item.nav_class] : "")} onClick={e => clickHandler(e)}>
                <Link className={classes["navigation__link"] + (nav_item.nav_class.length > 0 ? " " + classes[nav_item.nav_class] : "")} to={nav_item.nav_to}>
                    {
                        nav_item.svg && (
                            <svg className={classes[`${nav_item.nav_class}-icon`]}>
                                <use xlinkHref={nav_item.svg_icon}></use>
                            </svg>)
                    }

                    {nav_item.nav_title}</Link>
            </li>
        ))
    )
    return (
        <Fragment>
            <input type="checkbox" name="navi-toggle" className={classes["navigation__checkbox"]} id="navi-toggle" />
            <label htmlFor="navi-toggle" className={classes["navigation__button"]}>
                <span className={classes["navigation__icon"]}>&nbsp;</span>
            </label>
            <div className={classes["navigation__background"]}>&nbsp;</div>
            <nav className={classes["navigation"] + " " + classes["navigation__nav"] + " " + classes['landing-page']} id='global__nav'>
                <div className={classes["row"]}>
                    <svg className={classes["just-be-weird-logo"]}>
                        <use xlinkHref={"/assets/img/sprite.svg#icon-flickr4"}></use>
                    </svg>
                    <ul className={classes["main-nav"] + " " + classes["navigation__list"]}>
                        {jsx}
                    </ul>
                </div>
            </nav>
        </Fragment>
    )
}
