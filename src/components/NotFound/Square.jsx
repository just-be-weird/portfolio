import React from "react";
import classes from "../Sass/main.module.scss";

const Square = ({onClick, value}) => {
  return (
    <button className={classes.square} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
