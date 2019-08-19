import React from "react";
import classes from "../../Sass/main.module.scss";

const CustomSwitch = ({ switch_label, changeHandler, val, ipid }) => {
    return (
        <label htmlFor={ipid} className={classes.switch}>
            <input
                name={ipid}
                id={ipid}
                checked={val ? "checked" : ""}
                type='checkbox'
                onChange={changeHandler}
            />
            <span>{switch_label}</span>
        </label>
    );
};

export default CustomSwitch;
