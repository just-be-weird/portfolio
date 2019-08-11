import React from "react";
import classes from "../../Sass/main.module.scss";
import { containsSpaceDeLimTextOnly } from "../../Shared/Util";

export default function CustomInput({
    ipid = "text",
    iptype = "text",
    labelName = "No data provided",
    placeholderVal = "No placeholder",
    isRequired = false,
    changeHandler,
    regEx = containsSpaceDeLimTextOnly, //Excepet only Alpha chars
    isChecked = null,
    val = "",
}) {
    let classHolder = "",
        labelHolder = "",
        inputHolder = "";
    switch (iptype && iptype) {
        case "radio":
            classHolder =
                classes.radio__group + (isChecked ? " " + classes.active : "");
            labelHolder = classes.radio__label;
            inputHolder = classes.radio__input;
            placeholderVal = "";
            regEx = null;
            break;
        case "file":
            classHolder = classes.custom_input__group;
            labelHolder = classes.custom_input__label;
            inputHolder = classes.custom_input__input;
            regEx = null;
            break;
        default:
            classHolder = classes.custom_input__group;
            labelHolder = classes.custom_input__label;
            inputHolder = classes.custom_input__input;
            break;
    }
    return (
        <div className={classHolder}>
            <input
                type={iptype}
                id={ipid}
                pattern={regEx}
                name={placeholderVal}
                value={val}
                className={inputHolder}
                placeholder={placeholderVal}
                required={isRequired}
                checked={isChecked}
                onChange={changeHandler}
                style={{ color: val ? "#333" : "#989494" }}
            />
            <label htmlFor={ipid} className={labelHolder}>
                {iptype && iptype === "radio" ? (
                    <span className={classes["radio__button"]} />
                ) : null}
                {labelName}
                {isRequired && <span className={classes.highlight}> *</span>}
            </label>
        </div>
    );
}
