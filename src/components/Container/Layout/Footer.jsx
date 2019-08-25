import React from "react";
import { Link } from "react-router-dom";
import classes from "../../Sass/main.module.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Footer = ({ isAuthenticated }) => {
    return (
        <footer className={classes["footer"]}>
            <div className={classes["footer__logo-box"]}>
                <svg className={classes["footer__logo"]}>
                    <use xlinkHref='/assets/img/sprite.svg#icon-flickr4'></use>
                </svg>
            </div>
            <div className={classes["row"]}>
                {isAuthenticated && (
                    <div className={classes["col-1-of-2"]}>
                        <div className={classes["footer__navigation"]}>
                            <ul className={classes["footer__list"]}>
                                <li className={classes["footer__item"]}>
                                    <Link
                                        to='/'
                                        className={classes["footer__link"]}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className={classes["footer__item"]}>
                                    <Link
                                        to='/about'
                                        className={classes["footer__link"]}
                                    >
                                        about
                                    </Link>
                                </li>
                                <li className={classes["footer__item"]}>
                                    <Link
                                        to='/experience'
                                        className={classes["footer__link"]}
                                    >
                                        Experience
                                    </Link>
                                </li>
                                <li className={classes["footer__item"]}>
                                    <Link
                                        to='/projects'
                                        className={classes["footer__link"]}
                                    >
                                        Projects
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                <div className={classes["col-1-of-2"]}>
                    <p className={classes["footer__copyright"]}>
                        Designed by –{" "}
                        <a
                            href='https://github.com/just-be-weird'
                            className={classes["footer__link"]}
                        >
                            {" "}
                            Abhishek P. | 2019
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
Footer.propTypes = {
    isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Footer);
