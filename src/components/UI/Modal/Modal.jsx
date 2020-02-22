import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import classes from '../../Sass/main.module.scss'

export default function Modal({
                                id = '',
                                modalState,
                                hideModal,
                                children
                              }) {

  return (
    <Backdrop show={modalState} clicked={hideModal}>
      <div className={classes.popup__content + " " + (modalState ? classes.active : '')}
           id={classes[`popup--${id}`]} onClick={e => e.stopPropagation()}>
        <div className={classes.popup__right}>
          <button className={classes.popup__close} onClick={hideModal}>&times;</button>
          {children}
        </div>
      </div>
    </Backdrop>
  )
}
