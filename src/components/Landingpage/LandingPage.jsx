import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "../Sass/main.module.scss";
import CustomInput from "../UI/InputButtons/CustomInput";
import Modal from "../UI/Modal/Modal";
import { loginUser, signUpUser } from "../actions/auth";
import {
    isValidEmail,
    containsNumber6_8,
    containsTextOnly,
} from "../Shared/Util";

const LandingPage = ({ history, loginUser, signUpUser, isAuthenticated }) => {
    const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [handle, setHandle] = useState("");
    const [hideModal, setHideModal] = useState(false);

    const showRePassword = () => {
        setSignUp(!signUp);
    };

    const authHandler = e => {
        e.preventDefault();
        setHideModal(true);
    };

    const submitHandler = e => {
        e.preventDefault();
        const userData = {
            email,
            password,
            rePassword,
            isSignUp: signUp,
            handle,
        };
        if (signUp) {
            signUpUser(userData, history);
        } else {
            loginUser(userData, history);
        }
    };
    const headingEl = (
        <div
            className={
                classes["u-margin-bottom-medium"] + " " + classes["form__des"]
            }
        >
            <h2 className={classes["heading-secondary"]}>
                {" "}
                Create your own
                <br />{" "}
                <span className={classes.highlight}>
                    {" "}
                    customized portfolio.
                </span>
            </h2>
        </div>
    );
    return (
        <Fragment>
            <img
                className={classes.navigation__background_image}
                src='/assets/img/landing_page.svg'
                alt='LandingPage'
            />
            {!isAuthenticated && (
                <div className={classes["login"]}>
                    <div className={classes["login__form"]}>
                        {headingEl}
                        <CustomInput
                            iptype='radio'
                            ipid='register'
                            htmlFor='register-now'
                            isChecked={signUp}
                            val={signUp}
                            labelName='Need an account? Sign Up'
                            changeHandler={showRePassword}
                        />

                        <CustomInput
                            iptype='radio'
                            ipid='login'
                            htmlFor='login-now'
                            labelName='Or Login?'
                            isChecked={!signUp}
                            val={!signUp}
                            changeHandler={showRePassword}
                        />

                        <div className={classes["form__group"]}>
                            <button
                                className={
                                    classes["btn"] + " " + classes["btn--blue"]
                                }
                                onClick={authHandler}
                            >
                                {signUp ? "Sign Up" : "Log In"}
                            </button>
                        </div>
                        <Modal
                            modalState={hideModal}
                            hideModal={e => setHideModal(false)}
                            id={"login_modal"}
                        >
                            <form className={classes["form"]}>
                                {headingEl}
                                {signUp && (
                                    <CustomInput
                                        iptype='text'
                                        ipid='handle'
                                        htmlFor='user-handle'
                                        placeholderVal={
                                            handle.length === 0
                                                ? "Enter A Cool User ID"
                                                : handle
                                        }
                                        regEx={containsTextOnly}
                                        labelName='User Handle'
                                        isRequired={true}
                                        val={handle}
                                        changeHandler={e =>
                                            setHandle(e.target.value)
                                        }
                                    />
                                )}
                                <CustomInput
                                    iptype='email'
                                    ipid='email'
                                    htmlFor='user-email'
                                    placeholderVal={
                                        email.length === 0
                                            ? "abc@example.com"
                                            : email
                                    }
                                    regEx={isValidEmail}
                                    labelName='Email'
                                    isRequired={true}
                                    val={email}
                                    changeHandler={e =>
                                        setEmail(e.target.value)
                                    }
                                />
                                <CustomInput
                                    iptype='password'
                                    ipid='password'
                                    htmlFor='user-password'
                                    placeholderVal={
                                        password.length === 0
                                            ? "Password"
                                            : password
                                    }
                                    regEx={containsNumber6_8}
                                    labelName='Password'
                                    isRequired={true}
                                    val={password}
                                    changeHandler={e =>
                                        setPassword(e.target.value)
                                    }
                                />
                                {signUp && (
                                    <CustomInput
                                        iptype='password'
                                        ipid='re-password'
                                        htmlFor='user-re-password'
                                        placeholderVal={
                                            rePassword.length === 0
                                                ? "Confirm Password"
                                                : rePassword
                                        }
                                        regEx={containsNumber6_8}
                                        labelName='Confirm Password'
                                        isRequired={true}
                                        val={rePassword}
                                        changeHandler={e =>
                                            setRePassword(e.target.value)
                                        }
                                    />
                                )}

                                <div className={classes["form__group"]}>
                                    <button
                                        className={
                                            classes["btn"] +
                                            " " +
                                            classes["btn--blue"]
                                        }
                                        onClick={submitHandler}
                                    >
                                        {signUp ? "Sign Up" : "Log In"}
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </div>
            )}
        </Fragment>
    );
};
LandingPage.propTypes = {
    isAuthenticated: PropTypes.bool,
    loginUser: PropTypes.func.isRequired,
    signUpUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(
    mapStateToProps,
    { loginUser, signUpUser }
)(LandingPage);
