import React from "react";
import Tooltip from "../UI/Tooltip/Tooltip";

export default function SocialAction() {
  return (
    <section className="section-sidebar">
      <ul className="section-sidebar__container">
        <li className="section-sidebar__item">
          <a
            className="section-sidebar__anchor"
            href="https://github.com/just-be-weird"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <svg className="section-sidebar__icon section-sidebar__icon--github">
              <use xlinkHref="/assets/img/sprite.svg#icon-github" />
            </svg>
          </a>
        </li>
        <li className="section-sidebar__item">
          <a
            className="section-sidebar__anchor"
            href="https://www.linkedin.com/in/abhishekprajapatiengineer/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <svg className="section-sidebar__icon section-sidebar__icon--linkedin">
              <use xlinkHref="/assets/img/sprite.svg#icon-linkedin" />
            </svg>
          </a>
        </li>
        <li className="section-sidebar__item">
          <Tooltip id={"copy-email"}>
            <button
              className="section-sidebar__anchor"
              onclick="copyTextTo_CB()"
              onmouseout="outToolTip()"
            >
              <svg className="section-sidebar__icon section-sidebar__icon--envelope">
                <use xlinkHref="/assets/img/sprite.svg#icon-envelope" />
              </svg>
            </button>
          </Tooltip>
        </li>
        <li className="section-sidebar__item">
          <a
            className="section-sidebar__anchor"
            href="https://justbweird.wordpress.com/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <svg className="section-sidebar__icon section-sidebar__icon--wordpress">
              <use xlinkHref="/assets/img/sprite.svg#icon-wordpress" />
            </svg>
          </a>
        </li>
        <li className="section-sidebar__item">
          <a
            className="section-sidebar__anchor"
            href="skype:urfrnd.abhi"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <svg className="section-sidebar__icon section-sidebar__icon--skype">
              <use xlinkHref="/assets/img/sprite.svg#icon-skype" />
            </svg>
          </a>
        </li>
      </ul>
    </section>
  );
}
