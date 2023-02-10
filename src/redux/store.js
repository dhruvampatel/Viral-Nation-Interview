import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
//Reducers
import { userReducer } from './reducers/user-redcuer';
import { groupReducer } from './reducers/group-reducer';
import { groupFeedReducer } from './reducers/group-feed-reducer';
import { LOGOUT_USER } from './types';

const appReducer = combineReducers({
  user: userReducer,
  group: groupReducer,
  groupFeed: groupFeedReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default store = configureStore({
  reducer: rootReducer,
});
