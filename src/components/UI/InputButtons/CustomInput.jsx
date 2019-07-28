import React from "react";
import classes from "../../Sass/main.module.scss";

export default function CustomInput({
    ipid = "text",
    iptype = "type",
    labelName = "No data provided",
    placeholderVal = "No placeholder",
    isRquired = false,
    changeHandler,
    customHtml,
    regEx,
}) {
    let classHolder = iptype && iptype !== "radio" ? "custom_input" : "radio";
    return (
        <div className={classes[classHolder + "__group"]}>
            <input
                type={iptype}
                id={ipid}
                pattern={regEx}
                className={classes[classHolder + "__input"]}
                placeholder={placeholderVal}
                required={isRquired}
                onChange={changeHandler}
            />
            <label htmlFor={ipid} className={classes[classHolder + "__label"]}>
                {iptype && iptype === "radio" ? (
                    <span className={classes["radio__button"]} />
                ) : null}
                {labelName}
                {customHtml && <span>{customHtml}</span>}
            </label>
        </div>
    );
}
