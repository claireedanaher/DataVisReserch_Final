import React, { Component } from 'react';
import {Interactive} from './Interactive'; 
import './App.css';
import { Question } from './Question';
import { generate_data, getRandomInt } from './Util';
import {FrequencyChart} from './FrequencyChart'
import {TextVis} from './TextVis'
import {StaticVis} from './StaticVis'

class App extends Component {

  screen = 0;

  constructor(props) {
    super(props); 
    this.state = {
      results: [],
      data:  generate_data()
    }
  }


  /**
   * @param guessA guess for testing positive
   * @param guessB guess for having disease
   * @param visType vis that was used to answer question
   * @param questionN number of people that were used in the question (default 100)
   */
  nextScreen = (guessA, guessB, data, visType, questionN, time) => {
    console.log("This should save the data for later");
    for(var i = 0; i < this.state.results.length; i++) {
      console.log(this.state.results[i])
    }
    let row = {
      guessA: guessA, guessB: guessB, data: data, visType: visType, questionN: questionN, time: time
    }
    console.log(row);
    this.setState({
      results: [...this.state.results , row],
      data:  generate_data()
    });
    this.screen += 1; 
  }

  render() {
    let data = this.state.data; 
    let vis = <div/>;
    let visType = "";
    // let visNum = getRandomInt(3); 
    let visNum = 0; 
    if (visNum == 0) {
      vis = <Interactive data={data}/>
      visType = "interactive"; 
    } else if (visNum == 1) { 
        vis = <FrequencyChart {...data} test={0} condition={0}/>
        visType = "static_interactive"; 
    } else if (visNum === 2) {
        vis = <TextVis {...data}/>
        visType = "text"; 
    } else if (visNum === 3) {
        vis = <StaticVis {...data}/>
        visType = "static"; 
    }
    
    console.log("App is rendering");
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bayesian inference</h1>
        </header>
        <div className="Content">
          <Question data={data} nextScreen={this.nextScreen} visType={visType}>
            {vis}
          </Question>
        </div>
      </div>
    );
  }
}

export default App;
