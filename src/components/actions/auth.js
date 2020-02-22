import axios from "../../axios.instance";
import {
  AUTH_LOGOUT,
  CACHED_AUTH_SUCCESS,
  AUTH_SUCCESS,
  LOADING_UI,
  RESET_COCHE_DATA,
  STOP_LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS
} from "./actionTypes";
import {getProfile} from "./profile";


export const loginUser = (userData, history) => async dispatch => {
  dispatch({type: LOADING_UI}); //we dispatch a type and we will catch the type from the reducer
  try {
    const res = await axios.post("/auth/login", userData);
    if (res.data) {
      dispatch({type: AUTH_SUCCESS, payload: res.data});
      dispatch(getProfile(history, userData.isSignUp));
      dispatch({type: STOP_LOADING_UI});
      dispatch({type: CLEAR_ERRORS});
    }
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    dispatch({type: STOP_LOADING_UI});
  }
};

export const signUpUser = (userData, history) => async dispatch => {
  dispatch({type: LOADING_UI}); //we dispatch a type and we will catch the type from the reducer
  try {

    const res = await axios.post("/auth/signup", userData);
    if (res.data) {
      dispatch({type: AUTH_SUCCESS, payload: res.data});
      dispatch(getProfile(history, userData.isSignUp));
      dispatch({type: STOP_LOADING_UI});
      dispatch({type: CLEAR_ERRORS});
    }
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    dispatch({type: STOP_LOADING_UI});
  }
};

export const logoutUser = history => dispatch => {
  dispatch({type: LOADING_UI});
  localStorage.removeItem("_htua_tkn");
  localStorage.removeItem("_dtkn_exp");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({type: RESET_COCHE_DATA});
  dispatch({type: AUTH_LOGOUT});
  history.push("/");
  dispatch({type: CLEAR_ERRORS});
};

export const cachedLogin = () => dispatch => {
  localStorage.getItem("_htua_tkn")
  dispatch({type: LOADING_UI});
  dispatch({type: CACHED_AUTH_SUCCESS});
  dispatch({type: STOP_LOADING_UI});
  dispatch({type: CLEAR_ERRORS});
};
