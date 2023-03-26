import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Operation from './pages/Operation';
import BuyingShow from './BuyingShow';
import NewOperation from './layouts/NewOperation';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NewOperation />
    {/* <App /> */}
    {/* <Operation /> */}
    {/* <BuyingShow /> */}
  </React.StrictMode>,
);
