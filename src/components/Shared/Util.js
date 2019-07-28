import axios from "../../axios.instance";

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
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
