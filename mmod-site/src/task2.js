import React from 'react'
import './index.css'

const amount = 1_000_000;

function generate2(probabilities) {
    const count = Array(probabilities.length).fill(0);
    for (let i = 0; i < amount; i++) {
        probabilities.forEach((value, index) => {
            if (Math.random() <= value) {
                count[index]++;
            }
        });
    }
    let res = '';
    count.forEach((value, index) => {
        res += (index+1) +')' + 'True: ' + value + '(p=' + probabilities[index] + ')';
    });
    return res;
}

class Task2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: '',
            probabilities: Array(0),
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let arr = this.state.probabilities.map(value => parseFloat(value));
        let res = generate2(arr);
        this.setState({ res: res });
    }

    handleChange(event, index) {
        let probs = this.state.probabilities.slice();
        probs[index] = event.target.value
        this.setState({ probabilities: probs, res: '' });
    }

    handleNumberChange(event) {
        this.setState({
            probabilities: Array(parseInt(event.target.value)).fill(0),
        });
    }

    render() {
        const probabilities = this.state.probabilities.map((value, index) => {
            return (
                <label>
                    <p>Probability {index + 1}:</p>
                    <input
                        type='number'
                        min='0'
                        max='1'
                        step='0.01'
                        onChange={(e) => this.handleChange(e, index)}
                        required
                    />
                </label>
            )
        });


        let submitButton = '';
        if (this.state.probabilities.length) {
            submitButton = <input type='submit' value='Generate' />;
        }

        let res = '';
        if (this.state.res) {
            res = <p>Result: {this.state.res}</p>
        }

        return (
            <div className='task'>
                <p className='task-label'>Task 2</p>
                <form
                    className='task-form'
                    onSubmit={(e) => this.handleSubmit(e)}
                >
                    <label>
                        <p>Number of probabilities:</p>
                        <input
                            type='number'
                            min='1'
                            onChange={(e) => this.handleNumberChange(e)}
                            required
                        />
                        {/* some bug here(passing not proper args to gen2 func) */}
                    </label>
                    {probabilities}
                    {submitButton}
                </form>
                {res}
            </div>

        );
    }
}

export default Task2;