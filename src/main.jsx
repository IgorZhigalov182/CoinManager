import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Operation from './pages/Operation';
import BuyingShow from './BuyingShow';
import NewOperation from './layouts/NewOperation';
import ChartJSs from './ChartJS';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './layouts/Header';
import Widget from './components/Widget';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    {/* <NewOperation /> */}
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
      <Widget title={'Траты за жизнь'} />
      {/* <Widget title={'Доходы за жизнь'} /> */}
    </div>

    {/* <App /> */}
    {/* <Operation /> */}
    {/* <BuyingShow /> */}
  </React.StrictMode>,
);
