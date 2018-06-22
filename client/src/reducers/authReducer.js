import { TEST_DISPATCH } from "../actions/types";
import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from '../vaildation/is-empty'

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TEST_DISPATCH:
      return {
        ...state,
        user: payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(payload),
        user: payload
      };
    default:
      return state;
  }
};
