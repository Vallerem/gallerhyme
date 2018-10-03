import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// import _ from "lodash";
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
          <Route
            exact
            path="/"
            component={() => (
              <h1>
                Home
                <Link to="/users"> To users</Link>
              </h1>
            )}
          />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/:id" component={() => <h1>Detal!!</h1>} />
          <Route path="/login" render={() => <h1> Login</h1>} />
          <Route path="/signup" render={() => <h1> Signup</h1>} />
          <Route render={() => <h1> Not found</h1>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
