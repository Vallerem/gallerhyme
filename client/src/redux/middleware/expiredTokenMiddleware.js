import { TOKEN_HAS_EXPIRED } from "../constants";

export default () => next => action => {
  if (action.type === TOKEN_HAS_EXPIRED) {
    return window.location = "/login";
  }
  return next(action);
};
