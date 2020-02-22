import React from "react";
import PropTypes from "prop-types";
import classes from "../../Sass/main.module.scss";
import {connect} from "react-redux";

const Notificaton = ({errors, clicked}) => {
  let notification_class =
    errors &&
    (~Object.keys(errors)[0].indexOf("err") ||
      ~Object.keys(errors)[0].indexOf("Password"));
  return (
    <div
      className={
        classes.notification +
        " " +
        (errors &&
          (notification_class
            ? classes["notification-fail"]
            : classes["notification-success"]))
      }
    >
      <button className={classes.popup__close} onClick={clicked}>
        &#9932;
      </button>
      <p className={classes.notification__msg}>
        {errors && errors[Object.keys(errors)[0]]}
      </p>
    </div>
  );
};

Notificaton.propTypes = {
  errors: PropTypes.object,
};
const mapStateToProps = state => ({
  errors: state.ui.errors,
});

export default connect(mapStateToProps)(Notificaton);
