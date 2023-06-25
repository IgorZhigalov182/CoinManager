import React, { useState } from 'react';
import ChartJSs from './ChartJS';
import Button from './common/Button';
import LineChart from './LineChart';
import { useSelector } from 'react-redux';
import { getCountOperationByMounth } from '../../store/operations/operations.slice';

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
            <LineChart title={'Расходы'} />
          </div>
        )}

        {isProfitTypeOperation && (
          <div className="d-flex">
            <h1>Доходы</h1>
            <ChartJSs style={{ height: '10rem', width: '20rem' }} />
            <LineChart title={'Доходы'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetWithGraphs;
