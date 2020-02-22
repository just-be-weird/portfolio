import React from 'react';
import classes from '../../Sass/main.module.scss';


export default function InfinityStones() {
  const data = [
    [
      {
        "stoneId": "soul",
        "stoneIcon": "earth",
        "heading3": "Soul Stone – ReactJS",
        "stoneText": "Granted me ultimate control over all life in INTERNET universe.",
        "stoneList": [
          "Functional Component",
          "Virtual DOM/ JSX",
          "Performance"
        ]
      },
      {
        "stoneId": "time",
        "stoneIcon": "history",
        "heading3": "Time Stone – GIT",
        "stoneText": "Granted me total control over the past, present, and future of soure code (Life).",
        "stoneList": [
          "GitBash-CLI",
          "GitHub",
          "Tortoise Git"
        ]
      },
      {
        "stoneId": "space",
        "stoneIcon": "npm",
        "heading3": "Space Stone – NodeJS",
        "stoneText": "Granted me to exist and move objects on any side of stack – FullStack.",
        "stoneList": [
          "ExpressJS",
          "Module Sharing",
          "Js on server & JSON"
        ]
      },
      {
        "stoneId": "mind",
        "stoneIcon": "tree",
        "heading3": "Mind Stone – Redux",
        "stoneText": "Granted me the access on the all objects – STATE in existence simultaneously.",
        "stoneList": [
          "Predictable & Consistent",
          "Centralized",
          "Debuggable"
        ]
      }
    ],
    [
      {
        "stoneId": "reality",
        "stoneIcon": "paint-format",
        "heading3": "Reality Stone – CSS3",
        "stoneText": "Granted me ability to alter reality of websites on also create any type of alternate reality the user wishes.",
        "stoneList": [
          "Layouts/BEM",
          "Floats and FlexBox",
          "Bootstrap"
        ]
      },
      {
        "stoneId": "power",
        "stoneIcon": "database",
        "heading3": "Power Stone – MongoDB",
        "stoneText": "Granted me storage and access ability on all forms of data with to make things intreseting.",
        "stoneList": [
          "Mongoose",
          "Firebase",
          "Postman – MockAPI"
        ]
      }
    ]
  ];
  const jsx = (data && data.map((row, index) => (
    <div key={index} className={classes.row + " " + (index && index === 1 ? classes[`row--${index + 1}`] : '')}>
      {(row.map(stone => (
        <div key={stone.stoneId} className={classes[(index && index === 1 ? "col-1-of-2" : "col-1-of-4")]}>
          <div className={classes["stones-box"] + " " + classes[`stones-box--${stone.stoneId}`]}>
            <svg className={classes["stones-box__icon"]}>
              <use xlinkHref={`/assets/img/sprite.svg#icon-${stone.stoneIcon}`}></use>
            </svg>
            <h3 className={classes["heading-tertiary"]}>{stone.heading3}</h3>
            <p className={classes["stones-box__text"]}>{stone.stoneText}</p>
            <ul className={classes["stones-box__list"]}>
              {stone.stoneList.map((list, index) => (
                <li key={index} className={classes["stones-box__list-item"]}>{list}</li>
              ))}
            </ul>
          </div>
        </div>
      )))}
    </div>
  )));
  return (
    <section className={classes["section-stones"]}>
      <div className={classes["section-wrapper"]} id='stones'>
        <h2 className={classes["section-title"]}>My Infinity Stones</h2>
        {jsx}
      </div>
    </section>
  )
}
