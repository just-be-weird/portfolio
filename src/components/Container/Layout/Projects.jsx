import React, { Fragment, useState } from 'react'
import Modal from '../../UI/Modal/Modal';
import Card from '../../UI/Card/Card';

export default function Projects() {
    const [mstate, setMstate] = useState(false);

    const clickHandler = e => {
        e.preventDefault();
        setMstate(true)
    }
    const hideModalHandler = () => {
        setMstate(false);
    }
    const data = [
        [
            {
                id: "primaryarms",
                card_no: 1,
                project_name: "Primary Arms LLC",
                project_highlights: [
                    "Netsuite | Mont Blanc",
                    "BackboneJS | jQuery"
                ]
            },
            {
                id: "primaryarmswholsale",
                card_no: 2,
                project_name: "Primary Arms Wholesale",
                project_highlights: [
                    "Netsuite | Aconcagua",
                    "BackboneJS | jQuery"
                ]
            }
            , {
                id: "vsi",
                project_name: "The Vitaminshoppe",
                card_no: 3,
                project_highlights: [
                    "AngularJS | Angular",
                    "React | Bootstrap"
                ]
            }
        ],
        [
            {
                id: "socialbird",
                card_no: 3,
                project_name: "Social Bird",
                project_highlights: [
                    "React| Redux",
                    "Firebase &verbar; Heroku"
                ]
            },
            {
                id: "jbwportfolio",
                card_no: 1,
                project_name: "JustBeWeird Portfolio",
                project_highlights: [
                    "Netsuite | Aconcagua",
                    "BackboneJS | jQuery"
                ]
            }
            , {
                id: "othr",
                project_name: "Other Featured",
                card_no: 2,
                project_highlights: [
                    "React | Netlify",
                    "CSS3 | GithubPages"
                ]
            }
        ]
    ];

    const jsx = (data.length > 0 && data.map((row, index) => (
        <div key={index} className="row">
            {row.map(project => (
                <div key={project.id} className="col-1-of-3">
                    <Card {...project} clicked={clickHandler} />
                </div>
            ))}
        </div>
    ))
    );

    return (
        <Fragment>
            <section className="section-projects">
                <div className="section-wrapper" id="projects">
                    <h2 className="section-title">Projects</h2>
                    {jsx}
                    <div className="cta-container">
                        <a className="btn btn--white btn--animated" href="#contact">Contact</a>
                    </div>
                </div>
            </section>
            <Modal id='poroject' modalState={mstate} hideModal={hideModalHandler} />
        </Fragment>
    )
}
