import { ofType } from "redux-observable";
import {
  delay,
  mapTo,
  map,
  flatMap,
  mergeMap,
  catchError
} from "rxjs/operators";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
// import axios from "axios";

import { FETCH_ALL_USERS, FETCH_USER } from "../constants";
import { fetchingUserSuccess, fetchingUserError, expiredTokenRediect } from "../actions";

export const fetchAllUsersEpic = action$ =>
  action$.pipe(
    ofType(FETCH_ALL_USERS),
    mergeMap(action => {
      return ajax({
        url: "/users",
        method: "GET",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Im1hbnVAdmFsbGVyZW0uY29tIiwiZXhwIjoxNTM0Nzk4MjMxfQ.w3UZF09uBN77DmrtvHWrS76jYkbv7ejIG172XHo9kSg"
        }
      }).pipe(
        map(res => res.response),
        map(response => fetchingUserSuccess(response)),
        catchError(error => {
          if (error.response.message) {
            if (error.response.expired) {
              return of(expiredTokenRediect());
            }
            return of(fetchingUserError(error.response.message));
          }
          return of(
            fetchingUserError(
              "Error connecting to the server, please try later"
            )
          );
        })
      );
    })
  );
