import { LOGOUT_USER, LOGIN_USER } from '../types';

const initialState = null;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
};
