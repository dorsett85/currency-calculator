import React from 'react';
import { CurrencyCalculator, CurrencyInput, InputDivider } from './';
import currencyInfo from '../assets/currencyInfo';


export class CurrencyCalculatorContainer extends React.Component {
  constructor(props) {
    super(props);

    // Set initial application state requesting currency rates
    this.state = {
      currencyOneCode: 'EUR',
      currencyOneRate: 1,
      currencyOneAmount: 1,
      currencyTwoCode: 'EUR',
      currencyTwoRate: 1,
      currencyTwoAmount: 1
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
    } catch (err) {
      // TODO add UI error for api request failure
      console.log(err);
      return;
    }

    // Remember to add the base rate in the rates object!
    currencyData.rates[currencyData.base] = 1;

    // Merge in currency info and set the date of latest data
    currencyData.rates = this.mergeCurrencyInfo(currencyData);
    currencyData.date = new Date(currencyData.date).toDateString();
    this.setState(currencyData);

  }

  mergeCurrencyInfo(currencyData) {
    return Object.keys(currencyData.rates).map(code => {
      const rate = currencyData.rates[code];
      for (let { code: mergeCode, symbol, type: label } of currencyInfo) {
        if (code === mergeCode) { return { code, rate, symbol, label }; }
      }
      return { code, rate }; // No currency info found, notify currencyInfo.json owner
    }).sort((a, b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0);
  }

  getInputs(name) {
    const inputChanged = name.match(/One|Two/)[0];
    const inputToChange = inputChanged === 'One' ? 'Two' : 'One';
    return { inputChanged, inputToChange };
  }

  getAmounts(startingAmount, input, value) {
    const amount = value || this.state[`currency${startingAmount}Amount`];
    const amountToUpdate = `currency${input}Amount`;
    return { amount, amountToUpdate };
  }

  getRates(inputChanged, value) {
    let newRate, rateToBase, rateToNew, rateToUpdate;
    const inputOneChanged = inputChanged === 'One';
    const state = this.state;

    // Change the rates based on which selectors changed
    if (value) {
      newRate = state.rates.find(v => v.code === value).rate;
      rateToBase = inputOneChanged ? newRate : state.currencyOneRate;
      rateToNew = inputOneChanged ? state.currencyTwoRate : newRate;
      rateToUpdate = `currency${inputChanged}Rate`;
    } else {
      rateToBase = inputOneChanged ? state.currencyOneRate : state.currencyTwoRate;
      rateToNew = inputOneChanged ? state.currencyTwoRate : state.currencyOneRate;
    }

    return { rateToBase, rateToNew, rateToUpdate, newRate };
  }

  getNewAmount(amount, rateToBase, rateToNew) {
    return +(amount / rateToBase * rateToNew).toFixed(2);
  }

  handleTypeChange(e) {
    const { inputChanged } = this.getInputs(e.target.name);
    const { amount, amountToUpdate } = this.getAmounts('One', 'Two');
    const { rateToBase, rateToNew, rateToUpdate, newRate } = this.getRates(inputChanged, e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
      [rateToUpdate]: newRate,
      [amountToUpdate]: this.getNewAmount(amount, rateToBase, rateToNew)
    });
  }

  handleAmountChange(e) {
    const { inputChanged, inputToChange } = this.getInputs(e.target.name);
    const { amount, amountToUpdate } = this.getAmounts(inputChanged, inputToChange, e.target.value);
    const { rateToBase, rateToNew } = this.getRates(inputChanged);

    this.setState({
      [e.target.name]: amount,
      [amountToUpdate]: this.getNewAmount(amount, rateToBase, rateToNew)
    });
  }

  render() {
    return (
      <CurrencyCalculator date={this.state.date}>
        <CurrencyInput
          name='One'
          type={this.state.currencyOneCode}
          rates={this.state.rates}
          amount={this.state.currencyOneAmount}
          handleTypeChange={this.handleTypeChange}
          handleAmountChange={this.handleAmountChange}
        />
        <InputDivider/>
        <CurrencyInput
          name='Two'
          type={this.state.currencyTwoCode}
          rates={this.state.rates}
          amount={this.state.currencyTwoAmount}
          handleTypeChange={this.handleTypeChange}
          handleAmountChange={this.handleAmountChange}
        />
      </CurrencyCalculator>
    )
  }
}