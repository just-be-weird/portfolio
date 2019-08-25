import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "../../../axios.instance";
import { loadingUI, setUIErrors } from "../../actions/ui";
import classes from "../../Sass/main.module.scss";

const Dashboard = ({
    isAuthenticated,
    isloading,
    errors,
    profile,
    loadingUI,
    setUIErrors,
}) => {
    const {
        imageUrl,
        location,
        handle,
        userId,
        bio,
        email,
        website,
        education,
        experience,
        profile_data,
    } = profile;

    const followHandler = async e => {
        e.preventDefault();
        try {
            loadingUI(true);
            await axios.get(`/user/${userId}/follow`);
            loadingUI();
        } catch (err) {
            setUIErrors(err.response.data);
            loadingUI();
        }
    };

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
                            <span className={classes.heading}>{handle}</span>
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
                                    href={"mailto:" + email}
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
                                <div
                                    className={classes["btn-text"]}
                                    onClick={followHandler}
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
                                </div>{" "}
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
                        <div className={classes.skill}>
                            <h2 className={classes["section-subtitle"]}>
                                SKILLS
                            </h2>
                            <ul className={classes["skills-list"]}>
                                {profile_data[3].data[0].info_3_0_a &&
                                profile_data[3].data[0].info_3_0_a.split(",")
                                    .length > 0 ? (
                                    profile_data[3].data[0].info_3_0_a
                                        .split(",")
                                        .map((s, i) => (
                                            <li key={i}>
                                                <p
                                                    className={
                                                        classes.skill__item
                                                    }
                                                >
                                                    {s}
                                                </p>
                                            </li>
                                        ))
                                ) : (
                                    <li>
                                        <p className={classes.skill__item}>
                                            No skills added
                                        </p>
                                    </li>
                                )}
                            </ul>
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
                    style={{ display: "block", width: "56%" }}
                >
                    <h2 className={classes["section-subtitle"]}>Experience</h2>
                    <div className={classes["dashboard__content-row"]}>
                        {experience.length > 0 ? (
                            experience.map((exp, id) => (
                                <div key={id} className={classes._container}>
                                    <h4 className={classes.title}>
                                        {exp.title}
                                    </h4>
                                    <p className={classes.company}>
                                        <span>{exp.company + ", "}</span>
                                        <span>{exp.location}</span>
                                    </p>
                                    <p className={classes.date}>
                                        {exp.from + "-" + exp.to}
                                    </p>
                                    <p className={classes.description}>
                                        {exp.description}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className={classes._container}>
                                No Experience is been added.
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className={classes["dashboard__content-container"]}>
                <div
                    className={
                        classes["dashboard__content"] + " " + classes.education
                    }
                    style={{ display: "block", width: "56%" }}
                >
                    <h2 className={classes["section-subtitle"]}>Education</h2>
                    <div className={classes["dashboard__content-row"]}>
                        {education.length > 0 ? (
                            education.map((edu, id) => (
                                <div key={id} className={classes._container}>
                                    <h4 className={classes.school}>
                                        {edu.school}
                                    </h4>
                                    <p className={classes.degree}>
                                        <span>{edu.degree + ", "}</span>
                                        <span>{edu.field}</span>
                                    </p>
                                    <p className={classes.date}>
                                        {edu.from + "-" + edu.to}
                                    </p>
                                    <p className={classes.description}>
                                        {edu.description}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className={classes._container}>
                                No Experience is been added.
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

Dashboard.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loadingUI: PropTypes.func.isRequired,
    setUIErrors: PropTypes.func.isRequired,
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

export default connect(
    mapStateToProps,
    { loadingUI, setUIErrors }
)(Dashboard);
