import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic, rootReducer } from "./modules/root";
import expiredTokenMiddleware from "./middleware/expiredTokenMiddleware";
import initialState from "./initialState";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(expiredTokenMiddleware, epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
