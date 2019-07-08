import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import classes from '../Sass/main.module.scss'
import CustomInput from '../UI/InputButtons/CustomInput';


const LandingPage = () => (
    <Fragment>
        <img className={classes.navigation__background_image} src="/assets/img/landing_page.svg" alt="LandingPage" />
        <div className={classes["login"]}>
            <div className={classes["login__form"]}>
                <form action="#" className={classes["form"]}>
                    <div className={classes["u-margin-bottom-medium"]+ " " + classes["form__des"]}>
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
                    <CustomInput
                        iptype="radio"
                        ipid="register"
                        htmlFor="register-now"
                        labelName="Need an account? Sign Up"
                    />
                    <div className={classes["form__group"]}>
                        <button className={classes["btn"] + " " + classes["btn--blue"]}> Log In </button>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
)

export default LandingPage;