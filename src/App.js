import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Button from 'react-toolbox/lib/button/Button';
import AppBar from 'react-toolbox/lib/app_bar/AppBar.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar title="Hello World App" flat="false">

        </AppBar>
        <p className="App-intro">
          <Button label="Hello World!" raised primary />
        </p>
      </div>
    );
  }
}

export default App;