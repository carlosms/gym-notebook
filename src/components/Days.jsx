import React from 'react';

import Navigation from 'react-toolbox/lib/navigation/Navigation';

import Day from './Day'

class Days extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNextDay = () => {
    this.props.onCurrDateChange(1)
  };

  handlePrevDay = () => {
    this.props.onCurrDateChange(-1)
  };

  render() {
    let currDateData = this.props.data[this.props.currDate];
    let exercises = currDateData !== undefined ? currDateData.exercises : [];

    return (
      <div>
        <Navigation type='horizontal'
          actions={
            [
              { icon: 'chevron_left', raised: true, primary: false, onMouseUp: this.handlePrevDay },
              { label: this.props.currDate, flat: true, disabled: true },
              { icon: 'chevron_right', raised: true, primary: false, onMouseUp: this.handleNextDay },
            ]
          } />
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem', maxWidth: '500px', margin: 'auto' }}>
          <Day exercises={exercises}>
          </Day>
        </div>
      </div>
    );
  }
}

export default Days;