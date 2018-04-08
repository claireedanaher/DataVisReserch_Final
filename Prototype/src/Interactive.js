import React, { Component } from 'react';
import { FrequencyChart } from './FrequencyChart'; 
import './Interactive.css'

export class Interactive extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      condition: 0, 
      test: 0,
    }
  }

  handle_test_change = (event) => {
    let val = parseInt(event.target.value);
    this.setState((prevState) => {
      return {
        test: val, condition: prevState.condition
      };
    });
  }

  handle_condition_change = (event) => {
    let val = parseInt(event.target.value);
    this.setState((prevState) => {
      return {
        condition: val, test: prevState["test"]
      }
    });
  }
  
  render() {
    return (
      <div className="Interactive">
        <h2>What do you know?</h2>
        <h3>The Condition:</h3>
        <div className="Query"/>
          <form onChange={this.handle_condition_change}>
            <input type="radio" name="condition" value="1"/>Has Condition<br/>
            <input type="radio" name="condition" value="-1"/>No Condition<br/>
            <input type="radio" name="condition" value="0" defaultChecked="checked"/>Unknown Condition<br/>
          </form>
        <div className="Query"/>
        <h3>The Test:</h3>
        <div className="Query"/>
          <form onChange={this.handle_test_change}>
            <input type="radio" name="test" value="1"/>Positive Test<br/>
            <input type="radio" name="test" value="-1"/>Negative Test<br/>
            <input type="radio" name="test" value="0" defaultChecked="checked"/>Unknown Test<br/>
          </form>
        <div className="Query"/>
        <FrequencyChart
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