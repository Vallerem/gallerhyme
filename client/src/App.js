import React, { Component } from "react";
import "./App.css";

import UsersList from "./components/UsersList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <UsersList />
      </div>
    );
  }
}

export default App;
