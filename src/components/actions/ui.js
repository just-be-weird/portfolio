import { CLEAR_ERRORS, SET_ERRORS } from './actionTypes'

export const clearUIErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
}

export const setUIErrors = error => dispatch => {
    dispatch({
        type: SET_ERRORS,
        payload: error
    });
}