import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './layouts/Header';
import Widget from './components/Widget';
import { Provider } from 'react-redux';
import { createStore } from './store/store';

const store = createStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>,
);
