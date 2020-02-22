import {
  SET_COCHE_DATA,
  GET_COCHE_DATA,
  SET_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  GET_USER_PROFILE
} from "./actionTypes";
import axios from "../../axios.instance";

export const getProfile = () => async dispatch => {
  try {
    dispatch({ type: LOADING_UI });
    const res = await axios.get("/user/get-details");
    dispatch({ type: GET_COCHE_DATA, payload: res.data.credentials });
    dispatch({ type: STOP_LOADING_UI });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const setProfile = updates => dispatch => {
  dispatch({ type: SET_COCHE_DATA, payload: updates });
};

export const uploadImage = formData => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/user/image/uploads", formData);
    dispatch({
      type: SET_ERRORS,
      payload: res.data
    });
    dispatch({ type: STOP_LOADING_UI });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const gerReqUserProfile = userHandle => async dispatch => {
  try {
    dispatch({ type: LOADING_UI });
    const res = await axios.get(`user/${userHandle}`);
    dispatch({ type: GET_USER_PROFILE, payload: res.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    dispatch({ type: STOP_LOADING_UI });
  }
};
