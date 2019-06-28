import React from "react"
import { Link } from 'react-router-dom'

export default function MultiActions() {
  return (
    <section className="section-multi-action">
      <svg className="section-multi-action__icon section-multi-action__icon--action">
        <use xlinkHref="/assets/img/sprite.svg#icon-radio-checked" />
      </svg>
      <ul className="section-multi-action__container">
        <li className="section-multi-action__item">
          <Link
            className="section-multi-action__anchor"
            to="/"
            rel="nofollow noopener noreferrer"
          >
            <svg className="section-multi-action__icon section-multi-action__icon--home">
              <use xlinkHref="/assets/img/sprite.svg#icon-home2" />
            </svg>
          </Link>
        </li>
        <li className="section-multi-action__item">
          <a
            className="section-multi-action__anchor"
            href="/assets/docs/AbhishekPrajpati_Resume_2019_06.pdf"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <svg className="section-multi-action__icon section-multi-action__icon--download">
              <use xlinkHref="/assets/img/sprite.svg#icon-download" />
            </svg>
          </a>
        </li>
        <li className="section-multi-action__item">
          <Link
            className="section-multi-action__anchor"
            to='/contact'
            rel="nofollow noopener noreferrer"
          >
            <svg className="section-multi-action__icon section-multi-action__icon--down">
              <use xlinkHref="/assets/img/sprite.svg#icon-point-down" />
            </svg>
          </Link>
        </li>
      </ul>
    </section>
  );
}
