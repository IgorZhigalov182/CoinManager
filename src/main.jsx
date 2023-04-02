import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Operation from './pages/Operation';
import BuyingShow from './BuyingShow';
import NewOperation from './layouts/NewOperation';
import ChartJSs from './ChartJS';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NewOperation />
    <ChartJSs />

    {/* <App /> */}
    {/* <Operation /> */}
    {/* <BuyingShow /> */}
  </React.StrictMode>,
);
