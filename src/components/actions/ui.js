import { CLEAR_ERRORS } from './actionTypes'

export const clearUIErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
}