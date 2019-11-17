import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../../Sass/main.module.scss';
import Experience from './Experience';
import InfinityStones from './InfinityStones';
import Projects from './Projects';
import Contact from './Contact';

export default function About() {
	return (
		<React.Fragment>
			<section className={classes['section-about'] + ' ' + classes['container']}>
				<div className={classes['section-wrapper']} id='about'>
					<div>
						<h2 className={classes['section-title']}>About Creator</h2>
						<div className={classes['hero-text-box'] + ' ' + classes['heading-primary']}>
							<h2 className={classes['heading-primary'] + ' ' + classes['heading-primary--sub']}>
								Hi my name is,
							</h2>
							<div className={classes['hero-text-box-container']}>
								<h1 className={classes['heading-primary'] + ' ' + classes['heading-primary--main']}>
									{' '}
									<span className={classes.highlight}>Abhishek P.</span>{' '}
								</h1>
								<p className={classes['heading-secondary']}>
									A passionate software engineer based in Mumbai, India<br />
									– I create high-quality websites and digital applications <br /> with knowledge and
									passion.
								</p>
							</div>
						</div>
					</div>
					<p className={classes['long-copy']}>
						I`m a <span className={classes.highlight}>fullstack developer</span> at Adapty Inc.
						<br /> With my knowledge in both frontend & backend, I bring up{' '}
						<span className={classes.highlight}>
							fast, reliable, engaging & responsive websites powered{' '}
						</span>
						with efficient and modern backends.
						<br />
						<br />
						I`m a big fan of <span className={classes.highlight}>AGILE</span> Workflow, I use it`s
						collaborative, flexible and adaptive principles for indentifying scope for the product & evolve
						it by adding new business ideas, innovations and values that meet user needs as well as business
						objectives. I strongly focus on{' '}
						<span className={classes.highlight}>performance & responsive design </span>
						using the <span className={classes.highlight}>latest STCAK</span> that meets the requirements of
						modern time.
					</p>
					{/* <div className={classes['cta__container']}>
						<Link
							className={classes.btn + ' ' + classes.btn__blue + ' ' + classes.btn__animated}
							to='/experience'
						>
							Experience
						</Link>
					</div> */}
				</div>
			</section>
			<Experience />
			<InfinityStones />
			<Projects />
			<Contact />
		</React.Fragment>
	);
}
