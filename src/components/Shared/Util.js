import axios from "../../axios.instance";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const setAuthToken = tokenData => {
  const { token, _dtkn } = tokenData;
  if (token) {
    const _htua_tkn = `Bearer ${token}`;
    localStorage.setItem("_htua_tkn", _htua_tkn);
    localStorage.setItem("_dtkn_exp", _dtkn.exp);
    axios.defaults.headers.common["Authorization"] = _htua_tkn;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

//Regex
export const isValidEmail =
  '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
export const containsNumberBtn = (start, end) => `^\\d{${start},${end}}$`;
export const containsTextOnly = "^[a-zA-Z ]{3,}$";
export const containsDotAtEnd = "^[a-zA-Z. ]{2,}$";
export const commaSeperatedTextOnly = "^[a-zA-Z, ]{2,}$";
export const containsSpaceDeLimTextOnly = "^[a-zA-Z ]*$";
export const isValidPassword =
  '^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!#$%&? "]).*$';
export const matchAnyChar = (start, end) => ".{" + start + "," + end + "}"; //match any char with provided range

export const isMobile = window.innerWidth < 700;
