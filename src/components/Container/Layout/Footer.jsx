import React from 'react'
import classes from '../../Sass/main.module.scss'

export default function Footer() {
    return (
        <footer className={classes["footer"]}>
            <div className={classes["footer__logo-box"]}>
                <svg className={classes["footer__logo"]}>
                    <use xlinkHref="/assets/img/sprite.svg#icon-flickr4"></use>
                </svg>
            </div>
            <div className={classes["row"]}>
                <div className={classes["col-1-of-2"]}>
                    <div className={classes["footer__navigation"]}>
                        <ul className={classes["footer__list"]}>
                            <li className={classes["footer__item"]}><a href="#home" className={classes["footer__link"]}>Home</a></li>
                            <li className={classes["footer__item"]}><a href="#about" className={classes["footer__link"]}>about</a></li>
                            <li className={classes["footer__item"]}><a href="#experience" className={classes["footer__link"]}>Experience</a></li>
                            <li className={classes["footer__item"]}><a href="#projects" className={classes["footer__link"]}>Projects</a></li>
                        </ul>
                    </div>
                </div>
                <div className={classes["col-1-of-2"]}>
                    <p className={classes["footer__copyright"]}>
                        Designed by – {" "}<a href="https://github.com/just-be-weird" className={classes["footer__link"]}> Abhishek P. | 2019</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
