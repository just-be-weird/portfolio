import React from "react";
import classes from "./_backdrop.module.scss";

export default function Backdrop({ children, show, clicked }) {
  return (
    <div
      className={classes.backdrop + " " + (show ? classes.active : "")}
      onClick={clicked}
    >
      {children}
    </div>
  );
}
