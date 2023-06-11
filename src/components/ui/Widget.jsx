import React, { useState } from 'react';
import ChartJS from './ChartJS';
// import '../../styles/chartjs.css';
import NewOperation from './NewOperation';
import Button from './common/Button';

const Widget = ({ title }) => {
  const [state, setState] = useState(false);

  const handleAdd = () => {
    setState(!state);
  };

  return (
    <>
      <div className="wrap">
        <p>{title}</p>
        {
          <div className="widgetWrapper">
            <ChartJS />
          </div>
        }
        <Button handler={handleAdd} title={'Добавить'} style={{ width: '100%' }} />
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
