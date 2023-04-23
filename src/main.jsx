import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './layouts/Header';
import Widget from './components/Widget';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Header /> */}
      {/* <NewOperation /> */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
        <Widget title={'Траты за жизнь'} />
      </div>

      <App />
    </Provider>
  </React.StrictMode>,
);
