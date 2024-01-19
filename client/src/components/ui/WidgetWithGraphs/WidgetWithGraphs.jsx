import React, { useState } from 'react';
import Button from '../common/button/Button';
import LineChart from '../lineChart/LineChart';
import PieChart from '../PieChart/PieChart';
import styles from './WidgetWithGraphs.module.scss';

const WidgetWithGraphs = () => {
  const [isProfitType, setIsProfitType] = useState(false);

  return (
    <div className={styles.widgetWrapper}>
      <div className={styles.buttonWraper}>
        <Button
          spanStyle={isProfitType ? '' : styles.btnActive}
          title={'Расходы'}
          handler={() => setIsProfitType(!isProfitType)}
        />
        <Button
          title={'Доходы'}
          handler={() => setIsProfitType(!isProfitType)}
          spanStyle={isProfitType ? styles.btnActive : ''}
        />
      </div>

      <div className={styles.chartWrapper}>
        <PieChart typeOperation={isProfitType ? 'profit' : 'expense'} />
        <LineChart
          title={isProfitType ? 'Доходы' : 'Расходы'}
          backgroundColor={isProfitType ? 'rgba(69, 204, 101, 1)' : 'rgba(179, 20, 33, 1)'}
          borderColor={isProfitType ? 'rgba(69, 190, 101, 1)' : 'rgba(133,65, 52, 1)'}
        />
      </div>
    </div>
  );
};

export default WidgetWithGraphs;
