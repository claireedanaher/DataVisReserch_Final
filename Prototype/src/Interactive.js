import React, { Component } from 'react';
import './Interactive.css';
import person from './person.svg';
import * as d3 from 'd3'; 

/**
 * props: 
 *  has_condition: float
 *  positive_condition: float
 *  positive_no_condition: float
 *  number_of_people: count
 *  test: -1, 0, 1: 0 if not known
 *  condition: -1, 0, 1: 0 if not known
 *  
 */
export class Interactive extends Component {
  d3id = "D3Vis";

  defaults = {
    height: 600, width: 800, margin : {
      top: 20, right: 120, bottom: 20, left: 250,
    }
  }
  componentDidMount() {
    this.renderD3(); 
  }

  componentDidUpdate() {
    this.renderD3(); 
  }

  renderD3 = () => {
    let chartWidth = this.defaults.width- this.defaults.margin.left - this.defaults.margin.right; 
    let chartHeight = this.defaults.height - this.defaults.margin.top - this.defaults.margin.bottom; 
    let containerId = '#' + this.d3id; 

    

    d3.select(containerId).html(''); // just clear out what is there

    var chart = d3.select(containerId).append('svg')
      .attr('width', this.defaults.width)
      .attr('height', this.defaults.height)
      .attr('id', 'chart')
      .append('g')
        .attr('transform', `translate(${this.defaults.margin.left}, ${this.defaults.margin.top})`);


    // set up axis
    let data = this.make_data(); 
    console.log(data);

    // for each label, put it on the left of the line (using margin)

    let labelHeight = chartHeight / 4; 

    let attributes = chart.selectAll('.attribute')
      .data(data)
      .enter() 
      .append('g')
      .attr('class', 'attribute')
      .attr('transform', (_, i) => {
        return `translate(0, ${labelHeight * (i + .5)})`;
      });

      // let iconOffset = chartWidth / Math.max(...data.map(d => d.count)) 
      let iconOffset = chartWidth / Math.max(...data.map(d => d.count)) 
      attributes.selectAll('circle')
        .data((d) => [...Array(d.count).keys()])
        .enter()
        // <image x="10" y="20" width="80" height="80" xlink:href="recursion.svg" />
        .append('image') // change to icon
        .attr('x', (_, i) => (1 + i) * iconOffset)
        .attr('y', (_, i) => -15)
        .attr('width', 30)
        .attr('height', 30)
        .attr('xlink:href', person);
        // .append('circle') // change to icon
        // .attr('cx', (_, i) => (1 + i) * iconOffset)
        // .attr('r', 5)
        // .attr('fill', 'black');
      
      attributes
        .append('g')
        .attr('transform', `translate(-10, 5)`)
        .append('text')
        .attr('class', 'test_label')
        .attr('text-anchor', 'end')
        .text((d) => d.label);

      attributes
        .append('g')
        .attr('transform', d => `translate(${iconOffset * (d.count + 2)}, 5)`)
        .append('text')
        .text(d => d.count);



    chart.append('line')
      .attr('x1', '0')
      .attr('x2', '0')
      .attr('y1', '0')
      .attr('y2', chartHeight)
      .attr('stroke-width', 2)
      .attr('stroke', 'black');
  }

  make_data = () => {
    let number = this.props.number_of_people;
    let has_condition = Math.round(this.props.has_condition * number),
        no_condition = Math.round((1 - this.props.has_condition) * number),
        positive_condition = Math.round(this.props.positive_condition * has_condition), 
        negative_condition = Math.round((1 - this.props.positive_condition) * has_condition), 
        positive_no_condition = Math.round(this.props.positive_no_condition * no_condition), 
        negative_no_condition = Math.round((1 - this.props.positive_no_condition) * no_condition);
      
    console.log("has condition", has_condition)
    console.log("no condition", no_condition)
    console.log("pos, has condition", positive_condition)
    console.log("negative, has condition", negative_condition)
    console.log("pos, no condition", positive_no_condition)
    console.log("neg, no condition" , negative_no_condition)
    let data  = [], labels = []; 
    if(this.props.test === 0) {
      if(this.props.condition === 0) {
        labels = [
          "Positive Test & Has Condition",
          "Positive Test & No Condition",
          "Negative Test & Has Condition",
          "Negative Test & No Condition", 
        ]; 
        data = [
          positive_condition, 
          positive_no_condition, 
          negative_condition, 
          negative_no_condition
        ]
      } else if (this.props.condition === 1) {
        labels = [
          "Positive Test & Has Condition",
          "Negative Test & Has Condition",
        ]; 
        data = [
          positive_condition, 
          negative_condition, 
        ]
      } else {
        labels = [
          "Positive Test & No Condition",
          "Negative Test & No Condition", 
        ]; 
        data = [
          positive_no_condition, 
          negative_no_condition
        ]
      }
    } else if (this.props.test === 1) {
      if(this.props.condition === 0) {
        labels = [
          "Positive Test & Has Condition",
          "Positive Test & No Condition",
        ]; 
        data = [
          positive_condition, 
          positive_no_condition, 
        ]
      } else if (this.props.condition === 1) {
        labels = [
          "Positive Test & Has Condition",
        ]; 
        data = [
          positive_condition, 
        ]
      } else {
        labels = [
          "Positive Test & No Condition",
        ]; 
        data = [
          positive_no_condition, 
        ]
      }

    } else {
      if(this.props.condition === 0) {
        labels = [
          "Negative Test & Has Condition",
          "Negative Test & No Condition", 
        ]; 
        data = [
          negative_condition, 
          negative_no_condition
        ]
      } else if (this.props.condition === 1) {
        labels = [
          "Negative Test & Has Condition",
        ]; 
        data = [
          negative_condition, 
        ]
      } else {
        labels = [
          "Negative Test & No Condition", 
        ]; 
        data = [
          negative_no_condition
        ]
      }
    }

    let d = [];
    for (var i = 0; i < labels.length; i++) {
      d.push({label: labels[i], count: data[i]})
    }

    return d;

  }

  /**
   * This just creates a div + element to hold d3 svg things
   */
  render() {
    return (
        <div className="Interactive">
          <h2>Total: {this.props.number_of_people}</h2>
          <div id={this.d3id}/>
        </div>
    );
  }
}