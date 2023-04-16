import React, { useState } from 'react';
import ChartJSs from '../ChartJS';
import Button from './Button';
import '../styles/chartjs.css';
import NewOperation from '../layouts/NewOperation';

const Widget = ({ title }) => {
  const [state, setState] = useState(false);

  const handleAdd = () => {
    setState(!state);
  };

  return (
    <>
      <div className="wrap">
        <p>{title}</p>
        <div className="widgetWrapper">
          <ChartJSs />
        </div>
        <Button onClick={handleAdd} title={'Добавить'} style={{ width: '100%' }} />
      </div>
      {state && (
        <div>
          <NewOperation />
        </div>
      )}
    </>
  );
};

export default Widget;
