import React from 'react'
import { Link } from 'react-router-dom'
import classes from '../Sass/main.module.scss'

console.log(classes);
const LandingPage = () => (
    <div className={classes["hero-text-box"] + " " + classes["heading-primary"]}>
        <h2 className={classes["heading-primary"] + " " + classes["heading-primary--sub"]}>Hi my name is,</h2>
        <div className={classes["hero-text-box-container"]}>
            <h1 className={classes["heading-primary"] + " " + classes["heading-primary--main"]}> <span className={classes["highlight"]}>Abhishek P.</span> </h1>
            <p className={classes["heading-secondary"]}>A passionate software engineer based in Mumbai, India<br />
                – I create high-quality websites and digital applications <br /> with knowledge and passion.
                    </p>
        </div>
        <div className={classes["cta-container"]}>
            <Link className={classes["btn"] + " " + classes["btn--white"] + " " + classes["btn--animated"]} to="/about">Show me more</Link>
        </div>
    </div>
)

export default LandingPage;