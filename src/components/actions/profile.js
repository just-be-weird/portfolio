import { SET_COCHE_DATA } from './actionTypes';

export const getProfile = history => async dispatch => {
    history.push('/step/1');
    // dispatch({type:'A'})
}
export const setProfile = (updates) => dispatch => {
    dispatch({ type: SET_COCHE_DATA, payload: updates });
}