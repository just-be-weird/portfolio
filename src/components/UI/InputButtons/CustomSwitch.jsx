import React from "react";
import classes from '../../Sass/main.module.scss'

const CustomSwitch = ({switch_label,changeHandler}) => {
    return (
        <label className={classes.switch}>
            <input type='checkbox' onChange={changeHandler}/>
            <span>{switch_label}</span>
        </label>
    );
};

export default CustomSwitch;
