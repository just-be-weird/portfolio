import React, { useState } from "react";
import Tooltip from "../UI/Tooltip/Tooltip";
import classes from "../Sass/main.module.scss";

export default function SocialAction() {
    const [sa_data, setEmailCopyState] = useState({
        email: "abhi.chandresh@gmail.com",
        msg: "Copy Email😊",
    });

    const copyEmailHandler = async e => {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(
                sa_data.email ? sa_data.email : "Invalid data"
            );
        } else {
            let inp = document.createElement("INPUT");
            inp.value = "abhi.chandresh@gmail.com";
            document.body.appendChild(inp);
            inp.select();
            document.execCommand("copy");
            document.body.removeChild(inp);
        }
        setEmailCopyState({ ...sa_data, msg: "Copied!😊" });
    };

    const outToolTip = c => {
        setEmailCopyState({ ...sa_data, msg: "Copy Email😊" });
    };

    return (
        <section className={classes["section-sidebar"]}>
            <ul className={classes["section-sidebar__container"]}>
                <li className={classes["section-sidebar__item"]}>
                    <a
                        className={classes["section-sidebar__anchor"]}
                        href='https://github.com/just-be-weird'
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                    >
                        <svg
                            className={
                                classes["section-sidebar__icon"] +
                                " " +
                                classes["section-sidebar__icon--github"]
                            }
                        >
                            <use xlinkHref='/assets/img/sprite.svg#icon-github' />
                        </svg>
                    </a>
                </li>
                <li className={classes["section-sidebar__item"]}>
                    <a
                        className={classes["section-sidebar__anchor"]}
                        href='https://www.linkedin.com/in/abhishekprajapatiengineer/'
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                    >
                        <svg
                            className={
                                classes["section-sidebar__icon"] +
                                " " +
                                classes["section-sidebar__icon--linkedin"]
                            }
                        >
                            <use xlinkHref='/assets/img/sprite.svg#icon-linkedin' />
                        </svg>
                    </a>
                </li>
                <li className={classes["section-sidebar__item"]}>
                    <Tooltip id={"copy-email"} actionMsg={sa_data.msg}>
                        <button
                            className={classes["section-sidebar__anchor"]}
                            onClick={copyEmailHandler}
                            onMouseOut={outToolTip}
                        >
                            <svg
                                className={
                                    classes["section-sidebar__icon"] +
                                    " " +
                                    classes["section-sidebar__icon--envelope"]
                                }
                            >
                                <use xlinkHref='/assets/img/sprite.svg#icon-envelope' />
                            </svg>
                        </button>
                    </Tooltip>
                </li>
                <li className={classes["section-sidebar__item"]}>
                    <a
                        className={classes["section-sidebar__anchor"]}
                        href='https://justbweird.wordpress.com/'
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                    >
                        <svg
                            className={
                                classes["section-sidebar__icon"] +
                                " " +
                                classes["section-sidebar__icon--wordpress"]
                            }
                        >
                            <use xlinkHref='/assets/img/sprite.svg#icon-wordpress' />
                        </svg>
                    </a>
                </li>
                <li className={classes["section-sidebar__item"]}>
                    <a
                        className={classes["section-sidebar__anchor"]}
                        href='skype:urfrnd.abhi'
                        target='_blank'
                        rel='nofollow noopener noreferrer'
                    >
                        <svg
                            className={
                                classes["section-sidebar__icon"] +
                                " " +
                                classes["section-sidebar__icon--skype"]
                            }
                        >
                            <use xlinkHref='/assets/img/sprite.svg#icon-skype' />
                        </svg>
                    </a>
                </li>
            </ul>
        </section>
    );
}
