import React from 'react'
import classes from './_contentswitcher.module.scss'

export default function ContentSwitcher() {
    return (
        <div className="section-experience-selector">
            <ul className="section-experience-selector-tab">
                <li className="active">
                    <button role="tab" aria-selected="true" aria-controls="tab0" id="tab0" tabIndex="0"
                        className=""><span>Mikado</span>
                    </button>
                </li>
                <li>
                    <button role="tab" aria-selected="true" aria-controls="tab1" id="tab1" tabIndex="1">
                        <span>Adapty Inc</span>
                    </button>
                </li>
            </ul>
            <div className="section-experience-selector-job-desc">
                <div id="job0" className="active" role="tabpanel" tabIndex="0" aria-labelledby="job0"
                    aria-hidden="false">
                    <h4 className="job__title">
                        <span>Software Engineer</span>
                        <span className="job__company"><span>&nbsp;@&nbsp;</span>
                            <a href="https://www.linkedin.com/company/adapty/" target="_blank"
                                rel="nofollow noopener noreferrer">Adapty Inc
                            </a>
                        </span>
                    </h4>
                    <h5 className="job__span"><span>Apr 2017 - Present</span></h5>
                    <div className="ul-selector">
                        <ul>
                            <li>
                                <svg className="stones-box__icon stones-box__icon--circle-right">
                                    <use xlinkHref="/assets/img/sprite.svg#icon-circle-right"></use>
                                </svg>
                                <p>Designed and developed reliable, fast, engaging & responsive website
                                    components, with
                                    strong focus on performance & responsive design using the latest
                                    technologies.</p>
                            </li>
                            <li>
                                <svg className="stones-box__icon stones-box__icon--circle-right">
                                    <use xlinkHref="/assets/img/sprite.svg#icon-circle-right"></use>
                                </svg>
                                <p>
                                    Work with a variety of different languages, platforms, frameworks such as
                                    JavaScript, React, Redux, BackboneJS, Netsuite (Mont. Blanc, Aconcagua),
                                    SuiteScript, CSS/SCSS
                                    Wordpress and content management systems.
                                </p>
                            </li>
                            <li>
                                <svg className="stones-box__icon stones-box__icon--circle-right">
                                    <use xlinkHref="/assets/img/sprite.svg#icon-circle-right"></use>
                                </svg>
                                <p>
                                    Communicate and collaborate with offshore team of engineers
                                    and clients on a daily basis.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div id="job1" role="tabpanel" tabIndex="1" aria-labelledby="job1" aria-hidden="false" className="">
                    <h4 className="job__title"><span>Java Programmer Trainee</span><span
                        className=""><span>&nbsp;@&nbsp;</span><a
                            href="https://www.linkedin.com/in/sanjay-makhija-6475a410/" target="_blank"
                            rel="nofollow noopener noreferrer">MIKADO SOLUTIONS LIMITED</a></span></h4>
                    <h5 className=""><span>May 2016 - Nov 2016</span></h5>
                    <div>
                        <ul>
                            <li>
                                <svg className="stones-box__icon stones-box__icon--circle-right">
                                    <use xlinkHref="/assets/img/sprite.svg#icon-circle-right"></use>
                                </svg>
                                <p>
                                    Learned basic concepts of OOPS, JAVA.
                                </p>
                            </li>
                            <li>
                                <svg className="stones-box__icon stones-box__icon--circle-right">
                                    <use xlinkHref="/assets/img/sprite.svg#icon-circle-right"></use>
                                </svg>
                                <p>
                                    Learned HTML/CSS and played with number of basic prototype landing pages.
                                </p>
                            </li>
                            <li>
                                <svg className="stones-box__icon stones-box__icon--circle-right">
                                    <use xlinkHref="/assets/img/sprite.svg#icon-circle-right"></use>
                                </svg>
                                <p>
                                    Implemented OOP and JAVA by making handson projects like online shopping
                                    website
                                    with JSP, Servlets and personal chat application with RMI.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
