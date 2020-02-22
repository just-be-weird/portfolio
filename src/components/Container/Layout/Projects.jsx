import React, { Fragment, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import Card from "../../UI/Card/Card";
import classes from "../../Sass/main.module.scss";

export default function Projects() {
  const [mstate, setMstate] = useState(false);
  const [selectedCardstate, setSelectedCardstate] = useState({
    id: "other",
    card_no: 0,
    project_name: "fweiowe",
    project_highlights: ["nfefne"],
    project_data: {
      title: "feknfe",
      description: "fnkef",
      url: "ejefefn"
    }
  });

  const clickHandler = (e, project) => {
    e.preventDefault();
    setMstate(true);
    // console.log(project);
    setSelectedCardstate(project);
  };
  const hideModalHandler = () => {
    setMstate(false);
  };
  const data = [
    [
      {
        id: "primaryarms",
        card_no: 1,
        project_name: "Primary Arms LLC",
        project_highlights: ["Netsuite | Mont Blanc", "BackboneJS | jQuery"],
        project_data: {
          title: "AR-15 & AK-47 Parts & Accessories | Primary Arms",
          description:
            "Primary Arms carries over 200 of the most trusted brands with red dot sights, rifle scopes & more. It's a firearms US base B2C product.",
          url: "https://www.primaryarms.com/"
        }
      },
      {
        id: "primaryarmswholsale",
        card_no: 2,
        project_name: "Primary Arms Wholesale",
        project_highlights: ["Netsuite | Aconcagua", "BackboneJS | jQuery"],
        project_data: {
          title: "Primaryarms Wholesale",
          description:
            "Primary Arms's wholesale carries over 200 of the most trusted brands with red dot sights, rifle scopes & more. It's a firearms US base B2B product.",
          url: "https://www.pawholesale.com/"
        }
      },
      {
        id: "vsi",
        project_name: "The Vitaminshoppe",
        card_no: 3,
        project_highlights: ["AngularJS | jQuery", "Bootstrap | JavaScript"],
        project_data: {
          description:
            "Its US base B2C product, provides top quality vitamin & supplement brands with auto delivery subscriptions. From protein powders and probiotics to collagen & keto diet basics, The Vitamin Shoppe has all your best-self-supplies.",
          title:
            "The Vitamin Shoppe® | Vitamins, Supplements, Protein Powder & Keto Snacks",
          url: "https://www.vitaminshoppe.com/"
        }
      }
    ],
    [
      {
        id: "socialbird",
        card_no: 2,
        project_name: "Social Bird",
        project_highlights: ["React | Redux", "MongoDB | Heroku"],
        project_data: {
          description:
            "This is simple Mern stack based app, developed while taking Brad traverseys udemy course.",
          title: "React based crud app (Udemy Project)",
          credits: "@BradTraversey",
          url: "https://social-bird.herokuapp.com/"
        }
      },
      {
        id: "jbwportfolio",
        card_no: 3,
        project_name: "JustBeWeird Portfolio",
        project_highlights: ["React | Redux", "Firebase | Node"],
        project_data: {
          description:
            "This is my own portfolio developved and desgined by me.",
          title: "My Portfolio",
          url: "https://notebook-portfolio.web.app/"
        }
      },
      {
        id: "other",
        project_name: "Other Featured",
        card_no: 1,
        project_highlights: ["React | Netlify", "CSS3 | GithubPages"],
        project_data: {
          description: "List of other projects",
          title: "List of other projects",
          url: "https://notebook-portfolio.web.app/"
        }
      }
    ]
  ];

  const jsx =
    data.length > 0 &&
    data.map((row, index) => (
      <div key={index} className={classes["row"]}>
        {row.map(project => (
          <div key={project.id} className={classes["col-1-of-3"]}>
            <Card project={project} clicked={e => clickHandler(e, project)} />
          </div>
        ))}
      </div>
    ));

  return (
    <Fragment>
      <section className={classes["section-projects"]}>
        <div className={classes["section-wrapper"]} id="projects">
          <h2 className={classes["section-title"]}>Projects</h2>
          {jsx}
          <div className={classes.spacer}></div>
        </div>
      </section>
      <Modal id="poroject" modalState={mstate} hideModal={hideModalHandler}>
        <h4
          className={
            classes["section-subtitle"] + " " + classes["u-margin-bottom-small"]
          }
        >
          {selectedCardstate.project_name}
        </h4>
        <h3
          className={
            classes["heading-secondary"] +
            " " +
            classes["u-margin-bottom-small"]
          }
        >
          {selectedCardstate.project_data.title}
        </h3>
        <div className={classes.popup__content__container}>
          <img
            src={`/assets/img/projects/${selectedCardstate.id}_snap.jpg`}
            alt="project"
            className={classes.popup__img}
          />
          <div className={classes["popup__details"]}>
            <p className={classes["popup__details-text"]}>
              Technical Stack Details&ndash;
            </p>
            <ul>
              {selectedCardstate.project_highlights.map((highlight, index) => (
                <li key={index}>⊛ {highlight}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className={classes.popup__text}>
          {selectedCardstate.project_data.description}
        </p>
        <a
          href={selectedCardstate.project_data.url}
          className={classes["btn"] + " " + classes["btn__blue"]}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Now
        </a>
      </Modal>
    </Fragment>
  );
}
