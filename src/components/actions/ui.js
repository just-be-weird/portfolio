import { CLEAR_ERRORS, SET_ERRORS, LOADING_UI, STOP_LOADING_UI } from './actionTypes'

export const clearUIErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
}

export const loadingUI = (state = false) => dispatch => {
    state ? dispatch({ type: LOADING_UI }) : dispatch({ type: STOP_LOADING_UI });
}

export const setUIErrors = error => dispatch => {
    dispatch({
        type: SET_ERRORS,
        payload: error
    });
}