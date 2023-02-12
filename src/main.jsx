import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Login';
import Operation from './pages/Operation';
import BuyingShow from './BuyingShow';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <Login /> */}
    <Operation />
    <BuyingShow />
  </React.StrictMode>,
);
