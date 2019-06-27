import React, { Fragment } from 'react'
import { ReactComponent as Icon } from '../SVG/infinite.svg'

export default function GlobalNavigation() {
    return (
        <Fragment>
            <nav className="navigation navigation__nav">
                <div className="row">
                    {/* <svg className="just-be-weird-logo">
                            <use xlink:href="public/assets/img/sprite.svg#icon-flickr4"></use>
                    </svg> */}
                    <ul className="main-nav navigation__list js--main-nav">
                        <li className="navigation__item">
                            <a className="navigation__link" href="#home">Home</a>
                        </li>
                        <li className="navigation__item">
                            <a className="navigation__link" href="#about">About</a>
                        </li>
                        <li className="navigation__item">
                            <a className="navigation__link" className="main-nav-box__experience"
                                href="#experience">Experience</a>
                        </li>
                        <li className="navigation__item main-nav-box__infinite">
                            <a className="navigation__link" className="main-nav-box__infinite" href="#stones">
                                {/* <Icon xlinkHref="icon-actions" className="main-nav-box__infinite-icon">
                                </Icon> */}
                                Stones</a>
                        </li>
                        <li className="navigation__item">
                            <a className="navigation__link" href="#projects">Projects</a>
                        </li>
                        <li className="navigation__item">
                            <a className="navigation__link" href="#contact">Contact</a>
                        </li>
                    </ul>
                    <a href={'#'} className="mobile-nav-icon js--nav-icon"><i className="ion-ios-menu"></i></a>
                </div>
            </nav>
        </Fragment>
    )
}
