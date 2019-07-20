import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from '../Sass/main.module.scss'
import CustomInput from '../UI/InputButtons/CustomInput';


const LandingPage = () => {
    const [rePassword, setRePassword] = useState(false);
    const showRePassword = (p,n) => {
        console.log(">>",p,n);
        setRePassword(!rePassword);
    }

    return (
        <Fragment>
            <img className={classes.navigation__background_image} src="/assets/img/landing_page.svg" alt="LandingPage" />
            <div className={classes["login"]}>
                <div className={classes["login__form"]}>
                    <form action="#" className={classes["form"]}>
                        <div className={classes["u-margin-bottom-medium"] + " " + classes["form__des"]}>
                            <h2 className={classes["heading-secondary"]}> Create your own<br /> <span className={classes.highlight}> customized portfolio.</span></h2>
                        </div>
                        {/* <CustomInput
                        iptype="text"
                        ipid="name"
                        htmlFor="name"
                        placeholderVal={"Full Name"}
                        labelName="Full Name"
                        isRquired={true}
                    /> */}
                        <CustomInput
                            iptype="email"
                            ipid="email"
                            htmlFor="user-email"
                            placeholderVal={"Email"}
                            labelName="Email"
                            isRquired={true}
                        />
                        <CustomInput
                            iptype="password"
                            ipid="password"
                            htmlFor="user-password"
                            placeholderVal={"Password"}
                            labelName="Password"
                            isRquired={true}
                        />
                        {rePassword && (
                            <Fragment>
                                <CustomInput
                                    iptype="password"
                                    ipid="re-password"
                                    htmlFor="user-re-password"
                                    placeholderVal={"Confirm Password"}
                                    labelName="Confirm Password"
                                    isRquired={true}
                                />
                                <CustomInput
                                    iptype="radio"
                                    ipid="login"
                                    htmlFor="login-now"
                                    labelName="Or Login?"
                                    onSelected={showRePassword}
                                />
                            </Fragment>
                        )}
                        {!rePassword && (
                            <CustomInput
                                iptype="radio"
                                ipid="register"
                                htmlFor="register-now"
                                labelName="Need an account? Sign Up"
                                onSelected={showRePassword}
                            />)}
                        <div className={classes["form__group"]}>
                            <button className={classes["btn"] + " " + classes["btn--blue"]}>{ rePassword ? 'Sign Up' : 'Log In' }</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default LandingPage;