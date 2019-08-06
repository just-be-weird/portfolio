import axios from "../../axios.instance";
import {
    AUTH_LOGOUT,
    CACHED_AUTH_SUCCESS,
    AUTH_SUCCESS,
    LOADING_UI,
    STOP_LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS
} from "./actionTypes";
import { getProfile } from "./profile";

//Load User
// export const getUserData = (userData, history) => async dispatch => {
//     dispatch({ type: LOADING_UI });//we dispatch a type and we will catch the type from the reducer
//     if (localStorage._htua_tkn) {
//         setAuthToken(localStorage._htua_tkn);
//     }

//     try {
//         const res = await axios.post("/api/auth/login", );
//         console.log("action>>",res);
//         dispatch({
//             type: AUTH_SUCCESS,
//             payload: res.data,
//         });
//     } catch (error) {
//         dispatch({
//             type: AUTH_ERROR,
//         });
//     }
// };

export const loginUser = (userData, history) => async dispatch => {
    dispatch({ type: LOADING_UI }); //we dispatch a type and we will catch the type from the reducer
    try {
        const res = await axios.post("/auth/login", userData);
        if (res.data) {
            dispatch({ type: AUTH_SUCCESS, payload: res.data });
            dispatch(getProfile(history, userData.isSignUp));
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS });
        }
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
        dispatch({ type: STOP_LOADING_UI });
    }
};

export const signUpUser = (userData, history) => async dispatch => {
    dispatch({ type: LOADING_UI }); //we dispatch a type and we will catch the type from the reducer
    try {

        const res = await axios.post("/auth/signup", userData);
        if (res.data) {
            dispatch({ type: AUTH_SUCCESS, payload: res.data });
            dispatch(getProfile(history, userData.isSignUp));
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS });
        }
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
        dispatch({ type: STOP_LOADING_UI });
    }
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("_htua_tkn");
    localStorage.removeItem("_dtkn_exp");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: AUTH_LOGOUT });
};

export const cachedLogin = () => dispatch => {
    localStorage.getItem("_htua_tkn")
    dispatch({ type: LOADING_UI });
    dispatch({ type: CACHED_AUTH_SUCCESS });
    dispatch({ type: STOP_LOADING_UI });
    dispatch({ type: CLEAR_ERRORS });
};
