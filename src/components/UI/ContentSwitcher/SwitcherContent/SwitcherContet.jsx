import React from 'react'
import classes from './_switcher.module.scss'

export default function SwitcherContet({ experience, defaults }) {
    const payload = experience.length > 0 ? experience : defaults;
    console.log(classes)

    const currentExp = (
        payload && payload.map(exp => (
            <div key={`job${exp.index}+${exp.id}`}
                id={`job${exp.index}`}
                role="tabpanel" tabIndex={`${exp.index}`}
                aria-labelledby={`job${exp.index}`}
                aria-hidden="false" >
                <h4 className={classes["job__title"]}>
                    <span>{exp.data.job_title}</span>
                    <span className={classes["job__company"]}><span>&nbsp;@&nbsp;</span>
                        <a href={exp.data.at} target="_blank"
                            rel="nofollow noopener noreferrer">{exp.data.company}
                        </a>
                    </span>
                </h4>
                <h5 className={classes["job__span"]}><span>{exp.data.job_span}</span></h5>
                <div className={classes["ul-selector"]}>
                    <ul>
                        {exp.data.learning.map((learned, index) => (
                            <li key={index}>
                                <svg className={classes["experience-box__icon"]}>
                                    <use xlinkHref="/assets/img/sprite.svg#icon-circle-right"></use>
                                </svg>
                                <p>{learned}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        ))
    );

    return (
        <div className={classes["section-experience-selector-job-desc"]}>
            {currentExp}
        </div>
    )
}
