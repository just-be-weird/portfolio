import React from 'react';
import classes from '../../Sass/main.module.scss';

export default function Card({
	clicked,
	project: { id, project_name, card_no, project_highlights, project_data: { url } }
}) {
	return (
		<div className={classes.card} id={classes.id}>
			<div className={classes.card}>
				<div className={classes.card__side+ ' ' + classes['card__side--front']}>
					<div className={classes.card__picture + ' ' + classes[`card__picture--${card_no}`]}>&nbsp;</div>
					<h4 className={classes.card__heading}>
						<span
							className={classes['card__heading-span'] + ' ' + classes[`card__heading-span--${card_no}`]}
						>
							{project_name}
						</span>
					</h4>
					<div className={classes.card__details}>
						<ul>{project_highlights.map((highlight, index) => <li key={index}>{highlight}</li>)}</ul>
					</div>
				</div>
				<div
					className={
						classes.card__side +
						' ' +
						classes['card__side--back'] +
						' ' +
						classes[`card__side--back-${card_no}`]
					}
				>
					<div className={classes.card__cta}>
						<button className={classes.btn + ' ' + classes.btn__white} onClick={clicked}>
							View Details
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
