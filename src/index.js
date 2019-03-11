import React from 'react';
import ReactDOM from 'react-dom';
import { CurrencyCalculatorContainer } from './components/';
import './components/currencyCalculator.scss';

ReactDOM.render(<CurrencyCalculatorContainer />, document.getElementById('root'));

// Change the browser tab title
document.title = 'Currency Calculator';