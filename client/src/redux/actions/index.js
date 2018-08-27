import {
  FETCHING_USER_SUCCESS,
  FETCHING_USER_ERROR,
  FETCH_ALL_USERS,
  FETCH_USER,
  TOKEN_HAS_EXPIRED
} from "../constants";

export const fetchingUserSuccess = data => ({ type: FETCHING_USER_SUCCESS, data });
export const fetchingUserError = error => ({ type: FETCHING_USER_ERROR, error });

export const fetchAllUsers = () => ({ type: FETCH_ALL_USERS });
export const fetchUser = username => ({ type: FETCH_USER, username });

export const expiredTokenRediect = () => ({ type: TOKEN_HAS_EXPIRED });

