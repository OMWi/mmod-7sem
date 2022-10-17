import React from 'react'
import './index.css'

const amount = 1_000_000;

function generate3(probability, conditional_probability) {
    const count = Array(4).fill(0);
    for (let i = 0; i < amount; i++) {
        if (Math.random() <= probability) {
            if (Math.random() <= conditional_probability) {
                count[0]++;
            }
            else {
                count[1]++;
            }
        }
        else {
            if (Math.random() <= 1 - conditional_probability) {
                count[2]++;
            }
            else {
                count[3]++;
            }
        }
    }
    let res = '0: ' + count[0] + ' , 1: ' + count[1];
    res += ', 2: ' + count[2] + ', 3: ' + count[3];
    return res;
}

class Task3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            res: '', 
            prob: '',
            condProb: '',
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let res = generate3(parseFloat(this.state.prob), parseFloat(this.state.condProb));
        this.setState({ res: res });
    }

    handleChange(event) {
        this.setState({ prob: event.target.value, res: '' });
    }

    handleCondChange(event) {
        this.setState({ condProb: event.target.value, res: ''});
    }

    render() {
        let res = '';
        if (this.state.res) {
            res = <p>Result: {this.state.res}</p>
        }

        return (
            <div className='task'>
                <p className='task-label'>Task 3</p>
                <form className='task-form' onSubmit={(e) => this.handleSubmit(e)}>
                    <label>
                        <p>Probability:</p>
                        <input
                            type='number'
                            min='0'
                            max='1'
                            step='0.01'
                            onChange={(e) => this.handleChange(e)}
                            required
                        />
                    </label>
                    <label>
                        <p>Conditional probability:</p>                        
                        <input
                            type='number'
                            min='0'
                            max='1'
                            step='0.01'
                            onChange={(e) => this.handleCondChange(e)}
                            required
                        />
                    </label>
                    <input type='submit' value='Generate' />
                </form>
                {res}
            </div>

        );
    }
}

export default Task3;