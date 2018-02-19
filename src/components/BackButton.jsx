import React from 'react';

import Button from 'react-toolbox/lib/button/Button'
import { withRouter } from 'react-router-dom';

class BackButton extends React.Component {
  handleBack = () => {
    this.props.history.goBack();
  };

  render () {
    return <Button icon="arrow_back" onMouseUp={this.handleBack} floating mini />
  }
}

export default withRouter(BackButton);