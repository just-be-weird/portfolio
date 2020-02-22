import React from "react";
import classes from "../../Sass/main.module.scss";

export default function Contact() {
  return (
    <section className={classes["section-contact"]}>
      <img
        className={classes.contact__image}
        src="/assets/img/contact.svg"
        alt="UserAuthPage"
      />
      <div className={classes["section-wrapper"]} id={classes.contact}>
        <h2 className={classes["section-title"]}>Contact</h2>
        <p className={classes["long-copy"]}>
          Let`s build something unique. If you've some cool project, ideas or
          just want to have a talk, then feel free to contact me anytime. I will
          be glad
          <span role="img" aria-label="happy-simile">
            😊
          </span>{" "}
          to hear.
        </p>
        <div className={classes["cta__container"]}>
          <a
            className={classes["btn"] + " " + classes["btn__blue"]}
            href="mailto:abhi.chandresh@gmail.com"
          >
            Say Hi{" "}
            <span role="img" aria-label="hi-gesture">
              {" "}
              👋
            </span>
          </a>
          <a
            className={
              classes["btn"] +
              " " +
              classes["btn__blue"] +
              " " +
              classes["btn-resume"]
            }
            target="_blank"
            href="/assets/docs/AbhishekPrajpati_Resume_2019_07.pdf"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
