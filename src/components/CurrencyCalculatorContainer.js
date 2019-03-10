import React from 'react';

import { CurrencyCalculator, CurrencyInput } from './';
import currencyInfo from '../assets/currencyInfo';

export class CurrencyCalculatorContainer extends React.Component {
  constructor(props) {
    super(props);

    // Set initial application state requesting currency rates
    this.state = {
      fromCurrency: 'USD',
      fromAmount: 0,
      toCurrency: 'USD',
      toAmount: 0
    };
    this.initializeCurrencyData();

    // Bind methods
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);

  }

  async initializeCurrencyData() {

    // Request initial currency data
    let currencyData;
    try {
      const res = await fetch('https://api.openrates.io/latest');
      currencyData = await res.json();
    } catch(err) {
      // TODO add UI error for api request failure
      console.log(err);
      return;
    }

    // Remember to add the base rate in the rates object!
    currencyData.rates.EUR = 1;

    // Merge in currency info and set the date of latest data
    currencyData.rates = this.mergeCurrencyInfo(currencyData);
    currencyData.date = new Date(currencyData.date).toDateString();
    this.setState(currencyData);

  }

  mergeCurrencyInfo(currencyData) {
    return Object.keys(currencyData.rates).sort().map(code => {
      const rate = currencyData.rates[code];
      for (let { code: mergeCode, symbol, type } of currencyInfo) {
        if (code === mergeCode) { return {code, rate, symbol, type }; } 
      }
      return { code, rate }; // TODO no currency info found, notify currencyInfo.json owner
    })
  }

  handleTypeChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleAmountChange(e) {
    console.log(e.target.name, this.state[e.target.name]);
    this.setState({
      fromAmount: e.target.value,
      toAmount: e.target.value
    })
  }

  render() {
    console.log(this.state);
    return (
      <CurrencyCalculator
        date={this.state.date}
      >
        <CurrencyInput
          name='from'
          type={this.state.fromCurrency}
          rates={this.state.rates}
          amount={this.state.fromAmount}
          handleTypeChange={this.handleTypeChange}
          handleAmountChange={this.handleAmountChange}
        />
        <CurrencyInput
          name='to'
          type={this.state.toCurrency}
          rates={this.state.rates}
          amount={this.state.fromAmount}
          handleTypeChange={this.handleTypeChange}
          handleAmountChange={this.handleAmountChange}
        />
      </CurrencyCalculator>
    )
  }
}