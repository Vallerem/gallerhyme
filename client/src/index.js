import React from "react";
import ReactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css';
import "./index.css";
import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";

import { Provider } from "react-redux";
import configureStore from "./redux/store";

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// registerServiceWorker();
