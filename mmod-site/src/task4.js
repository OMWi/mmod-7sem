import React from 'react'
import './index.css'

const amount = 1_000_000;

function generate4(probabilities) {
    const sum = probabilities.reduce((a, b) => a + b)
    const eps = 0.000001
    if (Math.abs(sum - 1) > eps) {
        return 'probabilities sum != 1';
    }
    const count = Array(probabilities.length).fill(0);
    for (let i = 0; i < amount; i++) {
        let rand = Math.random();
        let right_border = 0;
        probabilities.some((value, index) => {
            right_border += value;
            if (rand <= right_border) {
                count[index]++;
                return true;
            }
        });
    }
    let res = '';
    count.forEach((value, index) => {
        res += 'True: ' + value + '(p=' + probabilities[index] + ')';
    });
    return res;
}

class Task4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            res: '', 
            probs: Array(0),
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let arr = this.state.probs.map(value => parseFloat(value));
        let res = generate4(arr);
        this.setState({ res: res });
    }

    handleChange(event, index) {
        let probs = this.state.probs.slice();
        probs[index] = event.target.value
        this.setState({ probs: probs, res: '' });
    }

    handleNumberChange(event) {
        this.setState({
            probs: Array(parseInt(event.target.value)).fill(0),
        });
    }

    render() {
        let res = '';
        if (this.state.res) {
            res = <p>Result: {this.state.res}</p>
        }

        let submitButton = '';
        if (this.state.probs.length) {
            submitButton = <input type='submit' value='Generate' />;
        }
        
        const probabilities = this.state.probs.map((value, index) => {
            return (
                <label>
                    <p>Probability {index + 1}</p>                    
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

        return (
            <div className='task'>
                <p className='task-label'>Task 4</p>
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

export default Task4;