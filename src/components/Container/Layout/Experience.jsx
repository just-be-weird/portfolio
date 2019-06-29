import React from 'react'
import { Link } from 'react-router-dom'
import ContentSwitcher from '../../UI/ContentSwitcher/ContentSwitcher';

export default function Experience() {
    return (
        <section className="section-experience" id="experience">
        <h2 className="section-title">Experience</h2>
        <ContentSwitcher />
        <div className="cta-container">
            <Link className="btn btn--white btn--animated js--scroll-to-plans" to="/stones">My Infinity Stones</Link>
        </div>
    </section>
    )
}
