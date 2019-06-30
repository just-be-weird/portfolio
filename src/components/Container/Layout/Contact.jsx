import React from "react";

export default function Contact() {
  return (
    <section className="section-contact">
      <div className="section-wrapper" id="contact">
        <h2 className="section-title">Contact</h2>
        <p className="long-copy">
          Let`s build something unique. If you've some cool project, ideas or
          just want to have a talk, then feel free to contact me anytime. I will
          be glad<span role="img" aria-label='happy-simile'>😊</span> to hear.
        </p>
        <div className="cta-container">
          <a
            className="btn btn--white btn--animated"
            href="mailto:abhi.chandresh@gmail.com"
          >
            Say Hi <span role="img" aria-label='hi-gesture'> 👋</span>
          </a>
          <a
            className="btn btn--white btn--animated btn-resume"
            target="_blank"
            href="public/assets/docs/AbhishekPrajpati_Resume_2019_06.pdf"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
