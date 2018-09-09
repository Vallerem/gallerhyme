import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UsersList from "./components/UsersList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={UsersList} />
          <Route path="/login" render={() => <h1> Login</h1>} />
          <Route render={() => <h1> Not found</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
