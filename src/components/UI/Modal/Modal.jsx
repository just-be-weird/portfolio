import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import classes from './_modal.module.scss'

export default function Modal({
    id = '',
    projectName = 'Name of the project',
    details = 'project details',
    modalState,
    hideModal
}) {

    return (
        <Backdrop show={modalState} clicked={hideModal}>
            <div className={classes.popup__content + " " + (modalState ? classes.active : '')}
                id={`popup--${id}`} onClick={e => e.stopPropagation()}>
                <div className={classes.popup__left}>
                    <img src="/assets/img/IDR_THEME_NTP_BACKGROUND@1x.png" alt="Tour"
                        className={classes.popup__img} />
                    <img src="/assets/img/IDR_THEME_NTP_BACKGROUND@1x.png" alt="Tour"
                        className={classes.popup__img} />
                </div>
                <div className={classes.popup__right}>
                    <button className={classes.popup__close} onClick={hideModal}>&times;</button>
                    <h2 className="heading-secondary  u-margin-bottom-small">{projectName}</h2>
                    <h3 className="heading-tertiary u-margin-bottom-small">&ndash; {details} &ndash;</h3>
                    <p className={classes.popup__text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, odit dolorum? Quae voluptas
                        recusandae eaque harum soluta? Dolorem, amet ut. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Rem neque similique, laudantium blanditiis odit harum inventore,
                        asperiores quibusdam adipisci maxime dolor facilis iste rerum dolorem in quia
                        necessitatibus.
                        </p>
                    <a href="/#" className="btn btn--green">Visit Now</a>
                </div>
            </div>
        </Backdrop>
    )
}
