import React, { useState } from "react";
import Tooltip from "../UI/Tooltip/Tooltip";

export default function SocialAction() {
  const [email, setEmailCopyState] = useState({
    email: 'abhi.chandresh@gmail.com',
    msg: 'Copy Email😊'
  });

  const copyEmailHandler = async (e) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(email.email ? email.email : 'Invalid data');
      setEmailCopyState({ msg: 'Copied!😊' });
    } else {
      let inp = document.createElement("INPUT");
      inp.value = "abhi.chandresh@gmail.com";
      document.body.appendChild(inp);
      inp.select();
      document.execCommand("copy");
      document.body.removeChild(inp);
      setEmailCopyState({ msg: 'Copied!😊' });
    }
  }

  const outToolTip = (c) => {
    setEmailCopyState({ msg: 'Copy Email😊' });
  }

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
          <Tooltip id={"copy-email"} actionMsg={email.msg} >
            <button
              className="section-sidebar__anchor"
              onClick={copyEmailHandler}
              onMouseOut={outToolTip}
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
