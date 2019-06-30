import React from 'react'
import { Link } from 'react-router-dom'
import ContentSwitcher from '../../UI/ContentSwitcher/ContentSwitcher';
import classes from '../../Sass/main.module.scss'

export default function Experience() {
    const data = [
        {
            id: 'Adapty',
            data: {
                job_title: 'Software Engineer',
                at: "https://www.linkedin.com/company/adapty/",
                company: 'Adapty Inc.',
                job_span: 'Apr 2017 - Present',
                learning: [`Designed and developed reliable, fast, engaging & responsive website
                components, with
                strong focus on performance & responsive design using the latest
                technologies.`,
                    `Work with a variety of different languages, platforms, frameworks such as
                JavaScript, React, Redux, BackboneJS, Netsuite (Mont. Blanc, Aconcagua),
                SuiteScript, CSS/SCSS
                Wordpress and content management systems.`,
                    `Communicate and collaborate with offshore team of engineers
                and clients on a daily basis.`
                ]
            }
        },
        {
            id: 'Mikado',
            data: {
                job_title: 'Java Programmer Trainee',
                at: 'https://www.linkedin.com/in/sanjay-makhija-6475a410/',
                company: 'Mikado Solutions ltd.',
                job_span: 'May 2016 - Nov 2016',
                learning: [`Learned basic concepts of OOPS, JAVA.`,
                    `Learned HTML/CSS and played with number of basic prototype landing pages.`,
                    `Implemented OOP and JAVA by making handson projects like online shopping
                    website
                    with JSP, Servlets and personal chat application with RMI.`
                ]
            }
        }
    ];
    return (
        <section className={classes["section-experience"]}>
            <div className={classes["section-wrapper"]} id="experience">
                <h2 className={classes["section-title"]}>Experience</h2>
                <ContentSwitcher data={data} />
                <div className={classes["cta-container"]}>
                    <Link className={classes["btn"] + " " + classes["btn--white"] + " " + classes["btn--animated"]} to="/stones">My Infinity Stones</Link>
                </div>
            </div>
        </section>
    )
}
