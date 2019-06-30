import React, { useState } from 'react'
import classes from './_contentswitcher.module.scss'
import SwitcherContet from './SwitcherContent/SwitcherContet';

export default function ContentSwitcher({ data }) {

    const [switcherContent, setSwitcherContent] = useState([]);

    const experiences = (
        data && data.map((exp, index) => (
            <li key={`${exp.id}+${index}`}>
                <button role="tab" aria-selected="true"
                    aria-controls={`tab${index}`} id={`tab${index}`} tabIndex={`${index}`}
                    className="" onClick={() => selectExperiencHandler(exp, index)} >
                    <span>{exp.id}</span>
                </button>
            </li>
        ))
    );


    const selectExperiencHandler = (exp = {}, index = 0) => {
        setSwitcherContent([{...exp,index}]);
    }
    return (
        <div className={classes["section-experience-selector"]}>
            <ul className={classes["section-experience-selector-tab"]}>
                {experiences}
            </ul>
            <SwitcherContet experience={switcherContent} defaults={[{...data[1], index:1}]} />
        </div>
    )
}
