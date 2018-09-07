import {
  FETCH_ALL_USERS,
  FETCH_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_ERROR
} from "../constants";

export const users = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS || FETCH_USER:
      return { ...state, fetchUserLoading: true, fetchUserError: null };
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        fetchUserLoading: false,
        fetchUserError: null,
        page: action.data.page,
        pages: action.data.pages,
        usersData: state.usersData.length
            ? [...state.usersData, ...action.data.users]
            : [...action.data.users],
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
