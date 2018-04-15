import React, { Component } from 'react';
import {Interactive} from './Interactive'; 
import './App.css';
import { Question } from './Question';
import { generate_data } from './Util';

class App extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      results: []
    }
  }


  nextScreen = (guessA, guessB, data) => {
    console.log("This should save the data for later");
    for(var i = 0; i < this.state.results.length; i++) {
      console.log(this.state.results[i])
    }
    let row = {
      guessA: guessA, guessB: guessB, data: data
    }
    this.setState({
      results: [...this.state.results , row]
    });

  }

  render() {
    let data = generate_data(); 
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bayesian inference</h1>
        </header>
        <div className="Content">
          <Question data={data} nextScreen={this.nextScreen}>
            <Interactive data={data}/>
          </Question>
        </div>
      </div>
    );
  }
}

export default App;
