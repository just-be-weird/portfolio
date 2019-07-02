import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import classes from './_loader.module.scss'

export default function Loader() {
    return (
        <Backdrop>
            <img className={classes.loader} src="/assets/img/loader.svg" alt="Loading.." />
        </Backdrop>
    )
}
