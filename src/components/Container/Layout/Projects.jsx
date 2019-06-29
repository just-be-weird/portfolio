import React, { Fragment, useState } from 'react'
import Modal from '../../UI/Modal/Modal';

export default function Projects() {
    const [mstate, setMstate] = useState(false);

    const clickHandler = e => {
        e.preventDefault();
        setMstate(true)
    }
    const hideModalHandler = () => {
        setMstate(false);
    }
    return (
        <Fragment>
            <section className="section-projects">
                <div className="section-wrapper" id="projects">
                    <h2 className="section-title">Projects</h2>
                    <div className="row">
                        <div className="col-1-of-3">
                            <div className="card">
                                <div className="card__side card__side--front">
                                    <div className="card__picture card__picture--1">
                                        &nbsp;
                                </div>
                                    <h4 className="card__heading">
                                        <span className="card__heading-span card__heading-span--1">
                                            Primary Arms LLC
                                    </span>
                                    </h4>
                                    <div className="card__details">
                                        <ul>
                                            <li>Netsuite &VerticalLine; Mont Blanc</li>
                                            <li>BackboneJS &VerticalLine; jQuery</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card__side card__side--back card__side--back-1">
                                    <div className="card__cta">
                                        <button className="btn btn--white popup__open" onClick={e => clickHandler(e)}>View Details</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-1-of-3">
                            <div className="card">
                                <div className="card">
                                    <div className="card__side card__side--front">
                                        <div className="card__picture card__picture--3">
                                            &nbsp;
                                    </div>
                                        <h4 className="card__heading">
                                            <span className="card__heading-span card__heading-span--3">
                                                Primary Arms Wholesale
                                        </span>
                                        </h4>
                                        <div className="card__details">
                                            <ul>
                                                <li>Netsuite &VerticalLine; Aconcagua</li>
                                                <li>BackboneJS &VerticalLine; jQuery</li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className="card__side card__side--back card__side--back-3">
                                        <div className="card__cta">
                                            <button className="btn btn--white popup__open" onClick={e => clickHandler(e)}>View Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1-of-3">
                            <div className="card">
                                <div className="card__side card__side--front">
                                    <div className="card__picture card__picture--2">
                                        &nbsp;
                                </div>
                                    <h4 className="card__heading">
                                        <span className="card__heading-span card__heading-span--2">The Vitaminshoppe</span>
                                    </h4>
                                    <div className="card__details">
                                        <ul>
                                            <li>AngularJS &VerticalLine; Angular</li>
                                            <li>React &VerticalLine; Bootstrap</li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="card__side card__side--back card__side--back-2">
                                    <div className="card__cta">
                                        <button className="btn btn--white popup__open" onClick={e => clickHandler(e)}>View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1-of-3">
                            <div className="card">
                                <div className="card__side card__side--front">
                                    <div className="card__picture card__picture--2">
                                        &nbsp;
                                </div>
                                    <h4 className="card__heading">
                                        <span className="card__heading-span card__heading-span--2">Social Bird</span>
                                    </h4>
                                    <div className="card__details">
                                        <ul>
                                            <li>React&VerticalLine; Redux &VerticalLine; Mongo&VerticalLine; Express</li>
                                            <li>bcrypt &VerticalLine; JWT &verbar; Heroku</li>
                                        </ul>
                                    </div>

                                </div>
                                <div className="card__side card__side--back card__side--back-2">
                                    <div className="card__cta">
                                        <button className="btn btn--white popup__open" onClick={e => clickHandler(e)}>View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1-of-3">
                            <div className="card">
                                <div className="card__side card__side--front">
                                    <div className="card__picture card__picture--1">
                                        &nbsp;
                                </div>
                                    <h4 className="card__heading">
                                        <span className="card__heading-span card__heading-span--1">
                                            JustBeWeird Portfolio
                                    </span>
                                    </h4>
                                    <div className="card__details">
                                        <ul>
                                            <li>React&VerticalLine; Redux</li>
                                            <li> Firebase &verbar; Heroku</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card__side card__side--back card__side--back-1">
                                    <div className="card__cta">
                                        <button className="btn btn--white popup__open" onClick={e => clickHandler(e)}>View Details</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-1-of-3">
                            <div className="card">
                                <div className="card">
                                    <div className="card__side card__side--front">
                                        <div className="card__picture card__picture--3">
                                            &nbsp;
                                    </div>
                                        <h4 className="card__heading">
                                            <span className="card__heading-span card__heading-span--3">Other Featured
                                            Porjects</span>
                                        </h4>
                                        <div className="card__details">
                                            <ul>
                                                <li>React</li>
                                                <li>CSS3 &VerticalLine; Bootstrap</li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className="card__side card__side--back card__side--back-3">
                                        <div className="card__cta">
                                            <button className="btn btn--white popup__open" onClick={e => clickHandler(e)}>View Details</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                    <div className="cta-container">
                        <a className="btn btn--white btn--animated js--scroll-to-plans" href="#contact">Contact</a>
                    </div>
                </div>
            </section>
            <Modal id='poroject' modalState={mstate} hideModal={hideModalHandler} />
        </Fragment>
    )
}
