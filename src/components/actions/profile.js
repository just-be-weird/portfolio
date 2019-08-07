import {
    SET_COCHE_DATA,
    GET_COCHE_DATA,
    LOADING_UI,
    STOP_LOADING_UI,
} from './actionTypes';
import { setUIErrors } from './ui'
import axios from "../../axios.instance";

export const getProfile = history => async dispatch => {
    try {
        dispatch({ type: LOADING_UI });
        const res = await axios.get('/user/get-details');
        dispatch({ type: GET_COCHE_DATA, payload: res.data.credentials });
        dispatch({ type: STOP_LOADING_UI });
    } catch (err) {
        setUIErrors(err.response.data);
        dispatch({ type: STOP_LOADING_UI });
    }
}

export const setProfile = updates => dispatch => {
    dispatch({ type: SET_COCHE_DATA, payload: updates });
}

export const uploadImage = formData => async dispatch => {
    dispatch({ type: LOADING_UI });
    try {
        const res = await axios.post('/user/image/uploads', formData);
        setUIErrors(res.data);
        dispatch({ type: STOP_LOADING_UI });
    } catch (err) {
        setUIErrors(err.response.data);
        dispatch({ type: STOP_LOADING_UI });
    }
};