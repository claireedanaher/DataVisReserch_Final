import React, { Component } from 'react';
import logo from './logo.svg';
import { Interactive } from './Interactive'; 
import './App.css';

class App extends Component {
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
        <Interactive
          has_condition={0.1}
          positive_condition={0.9}
          positive_no_condition={0.1}
          number_of_people={20}
          test={0}
          condition={0}
        />
      </div>
    );
  }
}

export default App;
