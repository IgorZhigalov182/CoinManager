import React, { useState } from 'react';
import ChartJSs from './ChartJS';
import Button from './common/Button';
import LineChart from './LineChart';

const WidgetWithGraphs = () => {
  const [isProfitTypeOperation, setIsProfitTypeOperation] = useState(false);

  const handleChangeTypeOperation = () => setIsProfitTypeOperation((prevState) => !prevState);

  return (
    <div className="container h-25 mt-3">
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <Button
                title={'Расходы'}
                // handler={() => handleChangeTypeOperation('Расходы')}
                handler={handleChangeTypeOperation}
                className={
                  isProfitTypeOperation ? 'btn ms-1 btn-secondary' : 'btn ms-1 btn-secondary active'
                }
              />
            </li>
            <li className="nav-item">
              <Button
                title={'Доходы'}
                handler={handleChangeTypeOperation}
                // className={'btn ms-3 mb-2 btn-secondary '}
                className={
                  isProfitTypeOperation
                    ? 'btn ms-3 mb-2 btn-secondary active'
                    : 'btn ms-3 mb-2 btn-secondary '
                }
              />
            </li>
          </ul>
        </div>
        {!isProfitTypeOperation && (
          <div className="d-flex">
            <ChartJSs style={{ height: '10rem', width: '20rem' }} />
            <LineChart style={{ height: '10rem', width: '20rem', border: '1px solid black' }} />
          </div>
        )}

        {isProfitTypeOperation && (
          <div className="card-body ">
            <h4>Доходный график</h4>
            <ChartJSs style={{ height: '10rem', width: '20rem' }} />
            {/* <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetWithGraphs;
