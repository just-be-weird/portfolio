import React from 'react'
import { Link } from 'react-router-dom'
import classes from '../../Sass/main.module.scss'


export default function About() {
    return (
        <section className={classes["section-about"] + " " + classes["container"]}>
            <div className={classes["section-wrapper"]} id="about">
                <h2 className={classes["section-title"]}>About Me</h2>
                <p className={classes["long-copy"]}>
                    I`m a <span className={classes["highlight"]}>fullstack developer</span> at Adapty Inc
                        <br /> With my knowledge in both frontend & backend,
                        I bring up <span className={classes["highlight"]}>fast, reliable, engaging & responsive websites powered</span>
                    with efficient and modern
                    backends.
                        <br />
                    <br />
                    I`m a big fan of <span className={classes["highlight"]}>AGILE</span> Workflow, I use it`s collaborative,
                    flexible and adaptive principles for
                    indentifying
                    scope for the product & evolve it by adding new business ideas, innovations and values that meet
                    user
                    needs as well as business objectives.
                        I strongly focus on <span className={classes["highlight"]}>performance & responsive design</span>
                    using the <span className={classes["highlight"]}>latest STCAK</span> that meets
                    the requirements of modern time.

                    </p>
                <div className={classes["cta-container"]}>
                    <Link className={classes["btn"] + " " + classes["btn--white"] + " " + classes["btn--animated"]} to="/experience">Experience</Link>
                </div>
            </div>
        </section>
    )
}
