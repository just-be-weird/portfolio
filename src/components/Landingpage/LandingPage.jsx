import React from 'react'

const LandingPage = () => (
    <div className="hero-text-box heading-primary">
        <h2 className="heading-primary heading-primary--sub">Hi my name is,</h2>
        <div className="hero-text-box-container">
            <h1 className="heading-primary heading-primary--main"> <span className="highlight">Abhishek P.</span> </h1>
            <p className="heading-secondary">A passionate software engineer based in Mumbai, India<br />
                – I create high-quality websites and digital applications <br /> with knowledge and passion.
                    </p>
        </div>
        <div className="cta-container">
            <a className="btn btn--white btn--animated js--scroll-to-plans" href="#about">Show me more</a>
        </div>
    </div>
)

export default LandingPage;