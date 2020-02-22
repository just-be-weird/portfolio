// import { firebase, googleAuthProvider } from "../Firebase/Firebase";
import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  CACHED_AUTH_SUCCESS
} from "../actions/actionTypes";
import { updateObject, setAuthToken } from "../Shared/Util";

const intialState = {
  token: "",
  isAuthenticated: false,
  user: null
};

export default (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CACHED_AUTH_SUCCESS:
      return updateObject(state, {
        token: localStorage.getItem("_htua_tkn"),
        isAuthenticated: true
      });

    case AUTH_SUCCESS:
      setAuthToken(payload);
      return updateObject(state, {
        token: payload.token,
        isAuthenticated: true
      });

    case AUTH_FAIL:
    case AUTH_LOGOUT:
      return updateObject(state, intialState);

    default:
      return state;
  }
};
