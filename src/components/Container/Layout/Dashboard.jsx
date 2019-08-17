import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "../../Sass/main.module.scss";

const Dashboard = ({ isAuthenticated, isloading, errors, profile }) => {
    const { imageUrl, location, handle, bio, email, website } = profile;
    return (
        <Fragment>
            <section className={classes.wrap_container}>
                <div>
                    <h2 className={classes["section-title"]}>Dashboard</h2>
                </div>
                <div className={classes.dashboard} role='main'>
                    <div className={classes.dashboard__sidebar}>
                        <h1 className={classes.vcard}>
                            {/* <a className='url' rel='contact' href='/outcrowd'> */}
                            <picture>
                                <img
                                    className='photo'
                                    alt='User'
                                    src={imageUrl}
                                />
                            </picture>
                            {handle}
                            {/* </a> */}
                            <span className={classes.location}>
                                <span className={classes.locality}>
                                    {location}
                                </span>
                            </span>
                        </h1>
                        <div className={classes.bio}>{bio}</div>
                        <div className={classes["profile-actions"]}>
                            <div className={classes["profile-message"]}>
                                <a
                                    className={
                                        classes.contact +
                                        " " +
                                        classes["btn-text"]
                                    }
                                    rel='tipsy'
                                    data-message-recipient='702789'
                                    data-button-location='profile'
                                    href='/messages/new?recipient_id=outcrowd'
                                    original-title='Send a message about a work opportunity'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        enableBackground='new 0 0 24 24'
                                        viewBox='0 0 24 24'
                                        role='img'
                                        className={classes.icon}
                                    >
                                        <path d='m12 13.595c-.715 0-1.43-.153-2.095-.46l-9.905-4.572v11.437c0 1.105.895 2 2 2h20c1.105 0 2-.895 2-2v-11.437l-9.905 4.572c-.665.307-1.38.46-2.095.46zm10-11.595h-20c-1.105 0-2 .895-2 2v2.36l10.743 4.958c.799.368 1.716.369 2.515 0l10.742-4.958v-2.36c0-1.105-.895-2-2-2z' />
                                    </svg>

                                    <span>Contact Me</span>
                                </a>
                            </div>

                            <div className={classes["profile-follow-prompt"]}>
                                <a
                                    className={classes["btn-text"]}
                                    rel='tipsy'
                                    data-signup-trigger=''
                                    data-context='follow-user'
                                    href='/outcrowd/followers'
                                    original-title='Follow Outcrowd '
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        enableBackground='new 0 0 24 24'
                                        viewBox='0 0 24 24'
                                        role='img'
                                        className={classes.icon}
                                    >
                                        <path d='m20 10h-6v-6c0-1.104-.896-2-2-2s-2 .896-2 2v6h-6c-1.104 0-2 .896-2 2s.896 2 2 2h6v6c0 1.104.896 2 2 2s2-.896 2-2v-6h6c1.104 0 2-.896 2-2s-.896-2-2-2z' />
                                    </svg>

                                    <span>Follow Me</span>
                                </a>{" "}
                                {/* <a
                                className={classes["form-btn"]}
                                href='/outcrowd/followers/outcrowd'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    enableBackground='new 0 0 24 24'
                                    viewBox='0 0 24 24'
                                    role='img'
                                    className={classes.icon}
                                >
                                    <path d='m21.28 4.473c-.848-.721-2.109-.604-2.817.262l-8.849 10.835-4.504-3.064c-.918-.626-2.161-.372-2.773.566s-.364 2.205.555 2.83l7.494 5.098 11.151-13.653c.707-.866.592-2.152-.257-2.874z' />
                                </svg>

                                <span>Following</span>
                            </a>{" "}
                            <a
                                className={classes["form-btn"]}
                                data-hover='Unblock'
                                href='/blocks/outcrowd'
                            >
                                <span>Blocked</span>
                            </a> */}
                            </div>
                        </div>
                        <div className={classes["profile-extra"]}>
                            <ul>
                                <li>
                                    <svg
                                        className={
                                            classes["profile-extra__icon"]
                                        }
                                    >
                                        <use
                                            xlinkHref={`/assets/img/sprite.svg#icon-earth`}
                                        />
                                    </svg>
                                    <a
                                        href={website}
                                        target='_blank'
                                        rel='nofollow noopener noreferrer'
                                    >
                                        {website}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={classes.dashboard__notification}>
                        <div
                            className={
                                classes["dashboard__notification-action"]
                            }
                        >
                            <Link
                                className={classes["action__link"]}
                                to={"/edit-profile"}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    enableBackground='new 0 0 32 32'
                                    viewBox='0 0 32 32'
                                    role='img'
                                    className={classes.icon}
                                >
                                    <path d='M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z' />
                                </svg>{" "}
                                Edit Profile
                            </Link>
                            <Link
                                className={classes["action__link"]}
                                to={"/add-experience"}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    enableBackground='new 0 0 32 32'
                                    viewBox='0 0 32 32'
                                    role='img'
                                    className={classes.icon}
                                >
                                    <path d='M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z' />
                                </svg>{" "}
                                Add Experience
                            </Link>
                            <Link
                                className={classes["action__link"]}
                                to={"/add-education"}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    enableBackground='new 0 0 32 32'
                                    viewBox='0 0 32 32'
                                    role='img'
                                    className={classes.icon}
                                >
                                    <path d='M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z' />
                                </svg>{" "}
                                Add Education
                            </Link>
                        </div>
                        <div className={classes.notification}>
                            <button className={classes.popup__close}>
                                &#9932;
                            </button>
                            <p className={classes.notification__msg}>
                                No notification.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={classes["dashboard__content-container"]}>
                <div
                    className={
                        classes["dashboard__content"] + " " + classes.experience
                    }
                >
                    No Experience Found.
                </div>
                <div
                    className={
                        classes["dashboard__content"] + " " + classes.education
                    }
                >
                    No Education Found.
                </div>
            </section>
        </Fragment>
    );
};

Dashboard.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    profile: PropTypes.object.isRequired,
    isloading: PropTypes.bool,
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.ui.errors,
    profile: state.profile,
    isloading: state.ui.loading,
});

export default connect(mapStateToProps)(Dashboard);
