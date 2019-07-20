import React from 'react'
import classes from '../../Sass/main.module.scss';


export default function CustomInput({
    ipid = "text",
    iptype = "type",
    ipname = "default",
    labelName = "No data provided",
    placeholderVal = "No placeholder",
    isRquired= false,
    onSelected
}) {
    let classHolder = iptype && iptype !== "radio" ? "custom_input" : "radio";
    return (
        <div className={classes[classHolder + "__group"]}>
            <input type={iptype} id={ipid} className={classes[classHolder + "__input"]} 
                name={ipname}
                placeholder={placeholderVal}
                required={isRquired}
                onChange={onSelected}

            />
            <label htmlFor={ipid} className={classes[classHolder + "__label"]}>
                {iptype && iptype === "radio" ? <span className={classes["radio__button"]}></span> : null}
                {labelName}
            </label>
        </div>
    )
}
