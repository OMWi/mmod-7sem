import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Task1 from './task1.js'
import Task2 from './task2.js'
import Task3 from './task3.js'
import Task4 from './task4.js'
import Task5 from './task5.js'


const amount = 1_000_000;

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
                <Task5 />
            </main>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Lab />);