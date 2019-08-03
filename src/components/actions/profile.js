import {
    SET_COCHE_DATA,
    LOADING_UI,
    STOP_LOADING_UI,
    SET_ERRORS,
} from './actionTypes';
import axios from "../../axios.instance";

export const getProfile = history => async dispatch => {
    history.push('/step/1');
    // dispatch({type:'A'})
}
export const setProfile = (updates) => dispatch => {
    dispatch({ type: SET_COCHE_DATA, payload: updates });
}

export const uploadImage = formData => async dispatch => {
    dispatch({ type: LOADING_UI });
    try {
        const res = await axios.post('/user/image/uploads', formData);
        dispatch({
            type: SET_ERRORS,
            payload: res.data,
        });
        dispatch({ type: STOP_LOADING_UI });
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
        });
        dispatch({ type: STOP_LOADING_UI });
    }
};