import React from 'react';


export class CurrencyInput extends React.PureComponent {

  render() {
    const { name, type, rates, amount, handleTypeChange, handleAmountChange } = this.props;
    return (
      <div className='currencyInputDiv'>
        <div className='currencyTypeInput currencyInput'>
          <select name={`currency${name}Code`} value={type} onChange={handleTypeChange}>
            {rates && rates.map(({code, label, symbol}) => (
              <option key={code} value={code}>
                {label} ({code}) - {symbol}
              </option>
            ))}
          </select>
        </div>
        <div className='currencyAmountInput currencyInput'>
          <input type='number' name={`currency${name}Amount`} min={0} value={amount} onChange={handleAmountChange}/>
        </div>
      </div>
    )
  }
}