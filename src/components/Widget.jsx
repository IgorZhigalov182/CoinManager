import React from 'react';
import ChartJSs from '../ChartJS';
import '../styles/chartjs.css';

const Widget = () => {
  return (
    <div className="widgetWrapper">
      <p>Траты за эту жизнь:</p>
      <ChartJSs />
    </div>
  );
};

export default Widget;
