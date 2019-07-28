import { GET_COCHE_DATA } from "../actions/actionTypes";
import { updateObject } from "../Shared/Util";

const intialState = {};

export default (state = intialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_COCHE_DATA:
            return updateObject(state, {});
        default:
            return state;
    }
};
