// index.js (or main.js)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter is used to wrap the entire app
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter> {/* Router wrapping the entire app */}
      <App />
    </BrowserRouter>
  </Provider>
);
