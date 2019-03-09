import React from 'react';

import './currencyCalculator.scss';


const CurrencyInput = props => {
  const { label, type, amount, handleAmountChange } = props;
  return (
    <div className='currencyInputDiv'>
      <div className='currencyTypeInput currencyInput'>
        <label className='currencyLabel'>{label}</label>
        <input name={`type${label}`} value={type}/>
      </div>
      <div className='currencyAmountInput currencyInput'>
        <input type='number' name={`amount${label}`} min={0} value={amount} onChange={handleAmountChange}/>
      </div>
    </div>
  )
};

export { CurrencyInput };