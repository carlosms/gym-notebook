/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import theme from './react-toolbox/theme';
import './react-toolbox/theme.css';

import { persistor, store } from './state';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
  , document.getElementById('root'),
);
registerServiceWorker();
