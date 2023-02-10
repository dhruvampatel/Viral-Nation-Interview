import { FETCH_GROUPS, FETCH_GROUP_FEED } from '../types';

export const fetchGroups = data => ({
  type: FETCH_GROUPS,
  payload: data,
});

export const fetchGroupFeed = data => ({
  type: FETCH_GROUP_FEED,
  payload: data,
});
