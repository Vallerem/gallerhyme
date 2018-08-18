import { combineEpics } from "redux-observable";
import { combineReducers } from "redux";
import { pingEpic, pongEpic, fetchAllUsersEpic } from "../epics";
import { users } from "../reducers";

export const rootEpic = combineEpics(fetchAllUsersEpic);

export const rootReducer = combineReducers({
  users
});
