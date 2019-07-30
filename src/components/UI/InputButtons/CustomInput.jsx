import React from "react";
import classes from "../../Sass/main.module.scss";
import { containsTextOnly } from "../../Shared/Util";

export default function CustomInput({
    ipid = "text",
    iptype = "text",
    labelName = "No data provided",
    placeholderVal = "No placeholder",
    isRquired = false,
    changeHandler,
    regEx = containsTextOnly, //Excepet only Alpha chars
    isChecked,
    val,
}) {
    let classHolder = iptype && iptype !== "radio" ? "custom_input" : "radio";
    return (
        <div
            className={
                classes[classHolder + "__group"] +
                (classHolder === "radio" && isChecked
                    ? " " + classes.active
                    : "")
            }
        >
            <input
                type={iptype}
                id={ipid}
                pattern={classHolder !== "radio" ? regEx : null}
                name={classHolder === "radio" ? placeholderVal : ""}
                value={val}
                className={classes[classHolder + "__input"]}
                placeholder={classHolder !== "radio" ? placeholderVal : ""}
                required={isRquired}
                checked={classHolder === "radio" && isChecked}
                onChange={changeHandler}
            />
            <label htmlFor={ipid} className={classes[classHolder + "__label"]}>
                {iptype && iptype === "radio" ? (
                    <span className={classes["radio__button"]} />
                ) : null}
                {labelName}
                {isRquired && <span className={classes.highlight}> *</span>}
            </label>
        </div>
    );
}
