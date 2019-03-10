import React from 'react';

import './currencyCalculator.scss';


export class CurrencyInput extends React.PureComponent {

  render() {
    const { name, type, rates, amount, handleTypeChange, handleAmountChange } = this.props;
    return (
      <div className='currencyInputDiv'>
        <div className='currencyTypeInput currencyInput'>
          <select name={`${name}Currency`} value={type} onChange={handleTypeChange}>
            {rates && rates.map(r => (
              <option key={r.type} value={r.code}>
                {`${r.type} (${r.code}) - ${r.symbol}`}
              </option>
            ))}
          </select>
        </div>
        <div className='currencyAmountInput currencyInput'>
          <input type='number' name={`${name}Amount`} min={0} value={amount} onChange={handleAmountChange}/>
        </div>
      </div>
    )
  }
}