import React from 'react';


export class CurrencyCalculator extends React.PureComponent {

  render() {
    const { date, children } = this.props;
    return (
      <div id='appContainer'>
        <div className='appBody'>
          <div className='appHeader'>
            <h2>Currency Calculator V1.0</h2>
            <h4>Rates from {date}</h4>
          </div>
          <div className='appContent'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}