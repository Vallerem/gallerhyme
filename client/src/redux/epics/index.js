import { ofType } from "redux-observable";
import {
  // delay,
  // mapTo,
  map,
  // flatMap,
  mergeMap,
  catchError
} from "rxjs/operators";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
// import axios from "axios";

import { FETCH_ALL_USERS } from "../constants";
import {
  fetchingUserSuccess,
  fetchingUserError,
  expiredTokenRediect
} from "../actions";

export const fetchAllUsersEpic = action$ =>
  action$.pipe(
    ofType(FETCH_ALL_USERS),
    mergeMap(({ page = 1 }) => {
      return ajax({
        url: `/api/users?page=${page}`,
        method: "GET",
        headers: {
          // TODO: Harcoded token has to be dynamic - JWT without expiring date
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1ZXJfbmFtZSIsImF1ZCI6ImNsaWVudCIsInVzZXJfaWQiOjEsImVtYWlsIjoibWFudUB2YWxsZXJlbS5jb20iLCJhZ2UiOjI3fQ.XYfZit2AHRobUTz3u0v3rHV5CnwoedYmZbXaAjG4f5s"
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
