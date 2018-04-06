import React, { Component } from 'react';
import { Interactive } from './Interactive'; 
import './App.css';

class App extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      condition: 0, 
      test: 0,
    }
  }

  handle_test_change = (event) => {
    console.log("Changed test value");
    console.log(event.target.value); 
    let val = parseInt(event.target.value);
    this.setState((prevState) => {
      return {
        test: val, condition: prevState.condition
      };
    });
  }
  handle_condition_change = (event) => {
    console.log("Changed condition value");
    console.log(event.target.value); 
    let val = parseInt(event.target.value);
    this.setState((prevState) => {
      console.log("prevState: " )
      console.log(prevState)
      return {
        condition: val, test: prevState["test"]
      }
    });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Bayesian inference</h1>
        </header>
        <div className="Query"/>
          <form onChange={this.handle_condition_change}>
            <input type="radio" name="condition" value="1"/>Has Condition
            <input type="radio" name="condition" value="-1"/>No Condition
            <input type="radio" name="condition" value="0" defaultChecked="checked"/>Unknown
          </form>
        <div className="Query"/>
        <div className="Query"/>
          <form onChange={this.handle_test_change}>
            <input type="radio" name="test" value="1"/>Positive Test
            <input type="radio" name="test" value="-1"/>Negative Test
            <input type="radio" name="test" value="0" defaultChecked="checked"/>Unknown
          </form>
        <div className="Query"/>
        <Interactive
          has_condition={0.1}
          positive_condition={0.9}
          positive_no_condition={0.1}
          number_of_people={40}
          test={this.state.test}
          condition={this.state.condition}
        />
      </div>
    );
  }
}

export default App;
