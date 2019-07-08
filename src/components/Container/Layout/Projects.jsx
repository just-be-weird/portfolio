import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../UI/Modal/Modal';
import Card from '../../UI/Card/Card';
import classes from '../../Sass/main.module.scss'

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
                card_no: 2,
                project_name: "Social Bird",
                project_highlights: [
                    "React | Redux",
                    "Firebase | Heroku"
                ],
                project_data: {
                    url: "https://salty-lake-94720.herokuapp.com/"
                } 
            },
            {
                id: "jbwportfolio",
                card_no: 3,
                project_name: "JustBeWeird Portfolio",
                project_highlights: [
                    "React | Redux",
                    "Firebase | Node"
                ]
            }
            , {
                id: "othr",
                project_name: "Other Featured",
                card_no: 1,
                project_highlights: [
                    "React | Netlify",
                    "CSS3 | GithubPages"
                ]
            }
        ]
    ];

    const jsx = (data.length > 0 && data.map((row, index) => (
        <div key={index} className={classes["row"]}>
            {row.map(project => (
                <div key={project.id} className={classes["col-1-of-3"]}>
                    <Card {...project} clicked={clickHandler} />
                </div>
            ))}
        </div>
    ))
    );

    return (
        <Fragment>
            <section className={classes["section-projects"]}>
                <div className={classes["section-wrapper"]} id="projects">
                    <h2 className={classes["section-title"]}>Projects</h2>
                    {jsx}
                    <div className={classes["cta-container"]}>
                        <Link className={classes["btn"]+" "+classes["btn--blue"]+" "+classes["btn--animated"]} to="/contact">Contact</Link>
                    </div>
                </div>
            </section>
            <Modal id='poroject' modalState={mstate} hideModal={hideModalHandler}>
                <h2 className={classes["heading-secondary"]+" "+classes["u-margin-bottom-small"]}>projectNam</h2>
                    <h3 className={classes["heading-tertiary"]+" "+classes["u-margin-bottom-small"]}>&ndash; details &ndash;</h3>
                    <p className={classes.popup__text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, odit dolorum? Quae voluptas
                        recusandae eaque harum soluta? Dolorem, amet ut. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Rem neque similique, laudantium blanditiis odit harum inventore,
                        asperiores quibusdam adipisci maxime dolor facilis iste rerum dolorem in quia
                        necessitatibus.
                        </p>
                    <a href="/#" className={classes["btn"]+" "+classes["btn--green"]}>Visit Now</a>
            </Modal>
        </Fragment>
    )
}
