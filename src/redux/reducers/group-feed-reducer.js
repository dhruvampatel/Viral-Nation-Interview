import { FETCH_GROUP_FEED } from '../types';

const initialState = [];

export const groupFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUP_FEED:
      return action.payload;
    default:
      return state;
  }
};
