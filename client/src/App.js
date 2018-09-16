import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UsersList from "./views/user/UsersList";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <h1>Home</h1>} />
          <Route exact path="/list/users" component={UsersList} />
          <Route exact path="/list/users/:id" component={() => <h1>Detal!!</h1>} />
          <Route path="/auth/login" render={() => <h1> Login</h1>} />
          <Route path="/auth/signup" render={() => <h1> Signup</h1>} />
          <Route render={() => <h1> Not found</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
