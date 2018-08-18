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
import {
  fetchingUserSuccess,
  fetchingUserError
} from "../actions";


export const fetchAllUsersEpic = action$ =>
  action$.pipe(
    ofType(FETCH_ALL_USERS),
    mergeMap(action => {
      return ajax({
        url: "/users",
        method: "GET",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6Im1hbnVAdmFsbGVyZW0uY29tIiwiZXhwIjoxNTM0NzAyNzI1fQ.WmSZX_ui0F8FQ-zHWRF8XpBlCYtuiMnG9UqTWQ37TFU"
        }
      }).pipe(
        map(res => res.response),
        map(response => fetchingUserSuccess(response)),
        catchError(error => of(fetchingUserError(error.response.error)))
      );
    })
  );
