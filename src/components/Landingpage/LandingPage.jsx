import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classes from "../Sass/main.module.scss";
import CustomInput from "../UI/InputButtons/CustomInput";
import { loginUser } from "../actions/auth";
import { isValidEmail, containsNumber6_8 } from "../Shared/Util";

const LandingPage = ({ history, loginUser, isAuthenticated }) => {
    const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const showRePassword = () => {
        setSignUp(!signUp);
    };

    const submitHandler = e => {
        e.preventDefault();
        const userData = {
            email,
            password,
            rePassword,
            isSignUp: signUp,
        };
        loginUser(userData, history);
    };

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
                        <form
                            className={classes["form"]}
                            onSubmit={submitHandler}
                        >
                            <div
                                className={
                                    classes["u-margin-bottom-medium"] +
                                    " " +
                                    classes["form__des"]
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
                                changeHandler={e => setEmail(e.target.value)}
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
                                changeHandler={e => setPassword(e.target.value)}
                            />
                            {signUp && (
                                <Fragment>
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
                                </Fragment>
                            )}

                            <CustomInput
                                iptype='radio'
                                ipid='login'
                                htmlFor='login-now'
                                labelName='Or Login?'
                                isChecked={!signUp}
                                val={!signUp}
                                changeHandler={showRePassword}
                            />
                            <CustomInput
                                iptype='radio'
                                ipid='register'
                                htmlFor='register-now'
                                isChecked={signUp}
                                val={signUp}
                                labelName='Need an account? Sign Up'
                                changeHandler={showRePassword}
                            />

                            <div className={classes["form__group"]}>
                                <button
                                    className={
                                        classes["btn"] +
                                        " " +
                                        classes["btn--blue"]
                                    }
                                >
                                    {signUp ? "Sign Up" : "Log In"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Fragment>
    );
};
LandingPage.propTypes = {
    isAuthenticated: PropTypes.bool,
    loginUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});
export default connect(
    mapStateToProps,
    { loginUser }
)(LandingPage);
