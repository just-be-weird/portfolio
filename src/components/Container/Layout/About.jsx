import React from 'react'

export default function About() {
    return (
        <section className="section-about container">
            <div className="section-wrapper" id="about">
                <h2 className="section-title">About Me</h2>
                <p className="long-copy">
                    I`m a <span className="highlight">fullstack developer</span> at Adapty Inc
                        <br /> With my knowledge in both frontend & backend,
                        I bring up <span className="highlight">fast, reliable, engaging & responsive websites powered</span>
                    with efficient and modern
                    backends.
                        <br />
                    <br />
                    I`m a big fan of <span className="highlight">AGILE</span> Workflow, I use it`s collaborative,
                    flexible and adaptive principles for
                    indentifying
                    scope for the product & evolve it by adding new business ideas, innovations and values that meet
                    user
                    needs as well as business objectives.
                        I strongly focus on <span className="highlight">performance & responsive design</span>
                    using the <span className="highlight">latest STCAK</span> that meets
                    the requirements of modern time.

                    </p>
                <div className="cta-container">
                    <a className="btn btn--white btn--animated js--scroll-to-plans" href="#experience">Experience</a>
                </div>
            </div>
        </section>
    )
}
