import React from 'react'

export default function InfinityStones() {
    return (
        <section className="section-stones">
                <div className="section-wrapper" id="stones">
                    <h2 className="section-title">My Infinity Stones</h2>
                    <div className="row">
                        <div className="col-1-of-4">
                            <div className="stones-box stones-box--soul">
                                <svg className="stones-box__icon stones-box__icon--earth">
                                    <use xlinkHref="public/assets/img/sprite.svg#icon-earth"></use>
                                </svg>
                                <h3 className="heading-tertiary">Soul Stone&ndash; ReactJS</h3>
                                <p className="stones-box__text">
                                    Granted me ultimate control over all life in INTERNET universe.
                                </p>
                                <ul className="stones-box__list">
                                    <li className="stones-box__list-item">Functional Components</li>
                                    <li className="stones-box__list-item">Virtual DOM/ JSX</li>
                                    <li className="stones-box__list-item">Performance</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-1-of-4">
                            <div className="stones-box stones-box--time">
                                <svg className="stones-box__icon stones-box__icon--history">
                                    <use xlinkHref="public/assets/img/sprite.svg#icon-history"></use>
                                </svg>
                                <h3 className="heading-tertiary">Time Stone&ndash; GIT</h3>
                                <p className="stones-box__text">
                                    Granted me total control over the past, present, and future of soure code
                                    (Life).
                                </p>
                                <ul className="stones-box__list">
                                    <li className="stones-box__list-item">GitBash-CLI</li>
                                    <li className="stones-box__list-item">GitHub</li>
                                    <li className="stones-box__list-item">Tortoise git</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-1-of-4">
                            <div className="stones-box stones-box--space">
                                <svg className="stones-box__icon stones-box__icon--npm">
                                    <use xlinkHref="public/assets/img/sprite.svg#icon-npm"></use>
                                </svg>
                                <h3 className="heading-tertiary">Space Stone&ndash; NodeJS</h3>
                                <p className="stones-box__text">
                                    Granted me to exist and move any object on any side of stack&ndash; FullStack.
                                </p>
                                <ul className="stones-box__list">
                                    <li className="stones-box__list-item">ExpressJS</li>
                                    <li className="stones-box__list-item">Module sharing </li>
                                    <li className="stones-box__list-item">Js on server & JSON</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-1-of-4">
                            <div className="stones-box stones-box--mind">
                                <svg className="stones-box__icon stones-box__icon--tree">
                                    <use xlinkHref="public/assets/img/sprite.svg#icon-tree"></use>
                                </svg>
                                <h3 className="heading-tertiary">Mind Stone&ndash; Redux</h3>
                                <p className="stones-box__text">
                                    Granted me the access on the all objects&ndash; STATE in existence simultaneously.
                                </p>
                                <ul className="stones-box__list">
                                    <li className="stones-box__list-item">Predictable & Consistent</li>
                                    <li className="stones-box__list-item">JCentralized</li>
                                    <li className="stones-box__list-item">Debuggable</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row row--2">
                        <div className="col-1-of-2">
                            <div className="stones-box stones-box--reality">
                                <svg className="stones-box__icon stones-box__icon--paint-format">
                                    <use xlinkHref="public/assets/img/sprite.svg#icon-paint-format"></use>
                                </svg>
                                <h3 className="heading-tertiary">Reality Stone&ndash; CSS3</h3>
                                <p className="stones-box__text">
                                    Granted me ability to alter reality of websites on also create any type of alternate
                                    reality the user wishes.
                                </p>
                                <ul className="stones-box__list">
                                    <li className="stones-box__list-item">Layouts/BEM</li>
                                    <li className="stones-box__list-item">Floats and Flexbox</li>
                                    <li className="stones-box__list-item">Bootstrap</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-1-of-2">
                            <div className="stones-box stones-box--power">
                                <svg className="stones-box__icon stones-box__icon--database">
                                    <use xlinkHref="public/assets/img/sprite.svg#icon-database"></use>
                                </svg>
                                <h3 className="heading-tertiary">Power Stone&ndash; MongoDB</h3>
                                <p className="stones-box__text">
                                    Granted me the access and manipulate all forms of data;
                                </p>
                                <ul className="stones-box__list">
                                    <li className="stones-box__list-item">Mongoose</li>
                                    <li className="stones-box__list-item">Firebase</li>
                                    <li className="stones-box__list-item">Postman &ndash;MockAPI</li>
                                    <br/>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <div className="cta-container">
                            <a className="btn btn--white btn--animated js--scroll-to-plans" href="#projects">Projects</a>
                        </div> */}
                </div>
            </section>
    )
}
