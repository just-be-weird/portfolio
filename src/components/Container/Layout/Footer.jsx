import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../../Sass/main.module.scss';
import { isMobile } from '../../Shared/Util';

const Footer = () => {
	return (
		<footer className={classes.footer}>
			<div className={classes['footer__logo-box']}>
				<svg className={classes.footer__logo}>
					<use xlinkHref='/assets/img/sprite.svg#icon-flickr4' />
				</svg>
			</div>
			<div className={classes.row}>
				<div className={classes['col-1-of-2']}>
					<div className={classes.footer__copyright}>
						Designed by &ndash;{' '}
						<a href='https://github.com/just-be-weird' className={classes.footer__link}>
							{' '}
							Abhishek P. | <small>2019</small>
						</a>
					</div>
				</div>

				{!isMobile ? (
					<div className={classes['col-1-of-2']}>
						<div className={classes.footer__copyright + ' ' + classes.footer__about_creator}>
							<Link className={classes.btn__noborder} to='/about'>
								About creator
							</Link>
						</div>
					</div>
				) : null}
			</div>
		</footer>
	);
};

export default Footer;
