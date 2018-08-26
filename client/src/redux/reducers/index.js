import {
  FETCH_ALL_USERS,
  FETCH_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_ERROR
} from "../constants";

export const users = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS || FETCH_USER:
      return { fetchUserLoading: true, fetchUserError: null };
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        fetchUserLoading: false,
        fetchUserError: null,
        users: action.data
      };
    case FETCHING_USER_ERROR:
      return {
        ...state,
        fetchUserLoading: false,
        fetchUserError: action.error
      };
    default:
      return state;
  }
};