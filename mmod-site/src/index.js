import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


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
        res += 'True: ' + value + '(p=' + probabilities[index] + ')';
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


function generate4(probabilities) {
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


class Lab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className='main'>
                <p className='amount-label'>Generated amount {amount}</p>
                <Task1 />
                <Task2 />
                <Task3 />
                <Task4 />
            </main>
        );
    }
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Lab />);
const amount = 1_000_000;