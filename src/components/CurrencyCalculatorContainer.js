import React from 'react';
import { CurrencyCalculator, CurrencyInput } from './';


export class CurrencyCalculatorContainer extends React.Component {
  constructor(props) {
    super(props);

    // Set initial application state requesting currency rates
    this.state = {
      fromCurrency: 'USD',
      fromAmount: 0,
      toCurrency: 'EUR',
      toAmount: 0
    };
    this.fetchCurrencyData();

    // Bind methods
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);

  }

  async fetchCurrencyData() {

    // Request initial currency data
    let currencyData;
    try {
      const res = await fetch('https://api.openrates.io/latest');
      currencyData = await res.json();
    } catch(err) {
      console.log(err)
    }
    console.log(currencyData);

    // Set the currency data along with the date of latest data and base conversion
    currencyData.date = new Date(currencyData.date).toDateString();
    this.setState(currencyData);

  }

  handleTypeChange(e) {
    console.log(e)
  }

  handleAmountChange(e) {
    console.log(e.target.name);
    this.setState({
      fromAmount: e.target.value,
      toAmount: e.target.value
    })
  }

  render() {
    return (
      <CurrencyCalculator
        date={this.state.date}
      >
        <CurrencyInput
          label='From'
          type={this.state.fromCurrency}
          amount={this.state.fromAmount}
          handleTypeChange={this.handleTypeChange}
          handleCurrencyAmountInput={this.handleCurrencyAmountChange}
        />
        <CurrencyInput
          label='To'
          type={this.state.toCurrency}
          amount={this.state.fromAmount}
          handleAmountChange={this.handleAmountChange}
        />
      </CurrencyCalculator>  
    )
  }
}