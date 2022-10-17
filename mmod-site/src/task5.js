import React from 'react'
import './index.css'

const amount = 1_000_000;

function generate5(donationTitles, donationValues) {
    let res = '';
    let sum = donationValues.reduce((a, b) => a + b);
    let probabilities = donationValues.map((value, index) => {
        return value / sum;
    });

    let rand = Math.random();
    let right_border = 0;
    probabilities.some((value, index) => {
        right_border += value;
        if (rand <= right_border) {
            // count[index]++;
            res += 'Winner: ' + donationTitles[index];
            return true;
        }
    });

    return res;
}

class Task5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            res: '',
            donationTitles: Array(0),
            donationValues: Array(0),
            donationValue: '',
            titleValue: '',
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let donation = parseInt(this.state.donationValue);
        let title = this.state.titleValue;

        let donationTitles = this.state.donationTitles.slice();
        let donationValues = this.state.donationValues.slice();

        let index = -1;
        if (!donationTitles.includes(title)) {
            donationTitles.push(title);
            donationValues.push(0);
        }
        index = donationTitles.indexOf(title);
        donationValues[index] += donation;
        this.setState({
            donationTitles: donationTitles,
            donationValues: donationValues,
        });
    }

    handleChange(event, index) {
        this.setState({ donationValue: event.target.value });
    }

    handleTitleChange(event) {
        this.setState({ titleValue: event.target.value})
    }

    handleRollClick(event) {
        let res = generate5(this.state.donationTitles, this.state.donationValues);
        this.setState({ res: res });
    }

    render() {
        let res = this.state.res;

        let donations = this.state.donationTitles.map((value, index) => {
            return (
                <tr>
                    <td>{this.state.donationTitles[index]}</td>
                    <td>{this.state.donationValues[index]}</td>
                </tr>
            )
        })

        return (
            <div className='task'>
                <p className='task-label'>Additional task</p>
                <form
                    className='task-form'
                    onSubmit={(e) => this.handleSubmit(e)}
                >
                    <label>
                        <p>Game title: </p>
                        <input
                            type='text'
                            min='1'
                            onChange={(e) => this.handleTitleChange(e)}
                            required
                        />
                    </label>
                    <label>
                        <p>Donation amount</p>
                        <input
                            type='number'
                            min='1'
                            onChange={(e) => this.handleChange(e)}
                            required
                        />
                    </label>
                    <input
                        type='submit'
                        value='Donate'
                    />
                </form>
                <table>
                    <tr>
                        <th>Game</th>
                        <th>Sum of donations</th>
                    </tr>
                    {donations}
                </table>

                <button
                    onClick={(e) => this.handleRollClick(e)}>Roll</button>
                {res}
            </div>

        );
    }
}

export default Task5;