import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from './react-toolbox/theme';
import './react-toolbox/theme.css';

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./state";

let store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();