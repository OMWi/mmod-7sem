import React from 'react'
import './index.css'

const amount = 1_000_000;

function generate1(probability) {
    let count = 0
    for (let i = 0; i < amount; i++) {
        if (Math.random() <= probability) {
            count++;
        }
    }
    let res = 'True: ' + count + ', False: ' + (amount - count);
    return res;
}

class Task1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { res: '', prob: '' };
    }

    handleSubmit(event) {
        event.preventDefault();
        let res = generate1(parseFloat(this.state.prob));
        this.setState({ res: res });
    }

    handleChange(event) {
        this.setState({ prob: event.target.value, res: '' });
    }

    render() {
        let res = '';
        if (this.state.res) {
            res = <p>Result: {this.state.res}</p>
        }
        return (
            <div className='task'>
                <p className='task-label'>Task 1</p>
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
                    <input type='submit' value='Generate' />
                </form>
                {res}
            </div>

        );
    }
}

export default Task1