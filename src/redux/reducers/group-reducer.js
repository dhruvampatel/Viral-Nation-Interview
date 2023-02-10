import { FETCH_GROUPS } from '../types';

const initialState = [];

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return action.payload;
    default:
      return state;
  }
};
