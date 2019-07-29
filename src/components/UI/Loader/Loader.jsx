import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import classes from './_loader.module.scss'

export default function Loader({ isloading }) {
    return (
        <Backdrop show={isloading}>
            <img className={classes.loader} src="/assets/img/loader.svg" alt="Loading.." />
        </Backdrop>
    )
}
