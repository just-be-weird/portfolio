import React, { Fragment } from "react";
import classes from "../../Sass/main.module.scss";

export default function Tooltip({ id = "", children, actionMsg = "😊" }) {
  return (
    <Fragment>
      <span className={classes.tooltip} id={classes[id]}>
        <span className={classes.tooltiptext} id={`tooltip_area--${id}`}>
          {actionMsg}
        </span>
        {children}
      </span>
    </Fragment>
  );
}
