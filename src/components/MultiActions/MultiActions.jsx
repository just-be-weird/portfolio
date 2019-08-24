import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Tooltip from "../UI/Tooltip/Tooltip";
import classes from "../Sass/main.module.scss";
import { logoutUser } from "../actions/auth";

const MultiActions = ({ history, logoutUser }) => {
    return (
        <section className={classes["section-multi-action"]}>
            <svg
                className={
                    classes["section-multi-action__icon"] +
                    " " +
                    classes["section-multi-action__icon--action"]
                }
            >
                <use xlinkHref='/assets/img/sprite.svg#icon-radio-checked' />
            </svg>
            <ul className={classes["section-multi-action__container"]}>
                <li className={classes["section-multi-action__item"]}>
                    <Tooltip id={"sign-out"} actionMsg={"Sign out"}>
                        <button
                            className={classes["section-sidebar__anchor"]}
                            onClick={() => logoutUser(history)}
                        >
                            {/* <Link
                                className={
                                    classes["section-multi-action__anchor"]
                                }
                                to='/'
                                rel='nofollow noopener noreferrer'
                            > */}
                            <svg
                                className={
                                    classes["section-multi-action__icon"] +
                                    " " +
                                    classes["section-multi-action__icon--exit"]
                                }
                            >
                                <use xlinkHref='/assets/img/sprite.svg#icon-exit' />
                            </svg>
                            {/* </Link> */}
                        </button>
                    </Tooltip>
                </li>

                <li className={classes["section-multi-action__item"]}>
                    <Link
                        className={classes["section-multi-action__anchor"]}
                        to='/'
                        rel='nofollow noopener noreferrer'
                    >
                        <svg
                            className={
                                classes["section-multi-action__icon"] +
                                " " +
                                classes["section-multi-action__icon--home"]
                            }
                        >
                            <use xlinkHref='/assets/img/sprite.svg#icon-home2' />
                        </svg>
                    </Link>
                </li>
                <li className={classes["section-multi-action__item"]}>
                    <a
                        className={classes["section-multi-action__anchor"]}
                        href='/assets/docs/AbhishekPrajpati_Resume_2019_06.pdf'
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                    >
                        <svg
                            className={
                                classes["section-multi-action__icon"] +
                                " " +
                                classes["section-multi-action__icon--download"]
                            }
                        >
                            <use xlinkHref='/assets/img/sprite.svg#icon-download' />
                        </svg>
                    </a>
                </li>
                <li className={classes["section-multi-action__item"]}>
                    <Link
                        className={classes["section-multi-action__anchor"]}
                        to='/contact'
                        rel='nofollow noopener noreferrer'
                    >
                        <svg
                            className={
                                classes["section-multi-action__icon"] +
                                " " +
                                classes["section-multi-action__icon--down"]
                            }
                        >
                            <use xlinkHref='/assets/img/sprite.svg#icon-point-down' />
                        </svg>
                    </Link>
                </li>
            </ul>
        </section>
    );
};

MultiActions.propTypes = {
    logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    isA: state.auth,
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(MultiActions);
