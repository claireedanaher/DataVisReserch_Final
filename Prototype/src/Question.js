import React, { Component } from 'react';
import './Question.css'

/**
 * props: 
 *  - Question to render
 *  - function: save(guessA, guessB, data)
 *  - data
 * 
 */
export class Question extends Component {

    handleSubmit = (e) => {
        e.preventDefault(); 
        let guessElementA = document.getElementById("guessA");
        let guessA = NaN;
        if (guessElementA)   {
            guessA = parseInt(guessElementA.value, undefined); 
        }
        let guessElementB = document.getElementById("guessB");
        let guessB = NaN; 
        if (guessElementB)   {
            guessB = parseInt(guessElementB.value, undefined); 
        }
        if(isNaN(guessB) || isNaN(guessA)) {
            console.log(guessA)
            console.log(guessB)
            return; 
        }
        this.props.nextScreen(guessA, guessB, this.props.data); 
    }

    render() {

        return (
            <div className="Question">
                <p>Question</p>
                {/* The children are the vis, passed through*/}
                {this.props.children}
                <hr/>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <p>
                        <i>How many people do you think will test positive?</i>
                    </p>
                    <label>Number testing Positive: 
                       <input type="number" min="0" max="100" id="guessA" placeholder={"Enter number..."} />
                    </label>
                    <br/>
                    <p>
                        <i>Out of those people, how many will have the disease?</i>
                    </p>
                    <label>Number with Disease:
                        <input type="number" min="0" max="100" id="guessB" placeholder={"Enter number..."} required={true}/>
                    </label>
                    <br/>
                    <input type="submit" value="Next" />
                </form>
            </div>
        );
    }
}