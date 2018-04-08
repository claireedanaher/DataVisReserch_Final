import React, { Component } from 'react';
import { FrequencyChart } from './FrequencyChart'; 
import {Interactive} from './Interactive'; 
import './App.css';

class App extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      condition: 0, 
      test: 0,
    }
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bayesian inference</h1>
        </header>
        <div className="Content">
          <Interactive/>
        </div>
      </div>
    );
  }
}

export default App;
