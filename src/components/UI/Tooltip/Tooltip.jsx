import React, { Fragment } from "react";
import classes from './_tooltip.module.scss'

export default function Tooltip({ id, children }) {
    // children.props.className = children.props.className+" "+classes.tooltip
    console.log(children)
  return (
    <Fragment>
        <span classNam={classes.tooltip}>
            {children}
            <span className={classes.tooltiptext} id={`tooltip_area--${id}`}>
                Copy Email
            </span>
        </span>
    </Fragment>
  );
}
