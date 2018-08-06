import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount = () => {
    fetch("/users", {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1MzM2NzEzMDh9.C-swmc_M0S_X9vytO1J_7LIwj9HPyyL64p8yCLY40rk"
      }
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
