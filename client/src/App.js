import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

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
