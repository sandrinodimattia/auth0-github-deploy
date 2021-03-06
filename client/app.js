import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './containers';
import { loadCredentials } from './actions/auth';
import configureStore from './store/configureStore';

// Make axios aware of the base path.
axios.defaults.baseURL = window.config.BASE_URL;

// Initialize the store.
const store = configureStore();
store.dispatch(loadCredentials());

// Render application.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

// Show the developer tools.
if (process.env.NODE_ENV !== 'production') {
  const showDevTools = require('./showDevTools');
  showDevTools(store);
}
