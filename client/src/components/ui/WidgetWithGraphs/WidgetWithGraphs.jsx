import React, { useState } from 'react';
import Button from '../common/button/Button';
import LineChart from '../LineChart';
import PieChart from '../PieChart/PieChart';
import styles from './WidgetWithGraphs.module.scss';

const WidgetWithGraphs = () => {
  const [isProfitTypeOperation, setIsProfitTypeOperation] = useState(false);

  const handleChangeTypeOperation = (typeOperation) => {
    if (!isProfitTypeOperation && typeOperation === 'profit') {
      setIsProfitTypeOperation((prevState) => !prevState);
    } else if (isProfitTypeOperation && typeOperation === 'expense') {
      setIsProfitTypeOperation((prevState) => !prevState);
    }
  };

  return (
    <div className="container h-25 mt-3">
      <div className={styles.buttonWraper}>
        <Button
          title={'Расходы'}
          handler={() => handleChangeTypeOperation('expense')}
          className={
            isProfitTypeOperation ? 'btn ms-1 btn-secondary' : 'btn ms-1 btn-secondary active'
          }
        />
        <Button
          title={'Доходы'}
          handler={() => handleChangeTypeOperation('profit')}
          className={
            isProfitTypeOperation
              ? 'btn ms-3 mb-2 btn-secondary active'
              : 'btn ms-3 mb-2 btn-secondary '
          }
        />
      </div>

      {!isProfitTypeOperation && (
        <div className={styles.chartWrapper}>
          <PieChart typeOperation={'expense'} />
          <LineChart
            title={'Расходы'}
            backgroundColor={'rgba(179, 20, 33, 1)'}
            borderColor={'rgba(133,65, 52, 1)'}
          />
        </div>
      )}

      {isProfitTypeOperation && (
        <div className={styles.chartWrapper}>
          <PieChart
            typeOperation={'profit'}
            style={{ height: '10rem', width: '20rem', margin: '1rem', marginLeft: '2rem' }}
          />
          <LineChart
            title={'Доходы'}
            backgroundColor={'rgba(69, 204, 101, 1)'}
            borderColor={'rgba(69, 190, 101, 1)'}
          />
        </div>
      )}
    </div>
  );
};

export default WidgetWithGraphs;
