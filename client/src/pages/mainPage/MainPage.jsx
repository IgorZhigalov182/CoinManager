import React from 'react';
import CardProfit from '../../components/ui/cardProfit/CardProfit';
import WidgetWithGraphs from '../../components/ui/WidgetWithGraphs/WidgetWithGraphs';
import WidgetBankAccount from '../../components/ui/widgetBankAccount/WidgetBankAccount';
import styles from './main.module.scss';

const MainPage = () => {
  return (
    <>
      <div className={styles.infoWrapper}>
        <CardProfit title={'Доходы'} />
        <CardProfit title={'Расходы'} />
        <WidgetBankAccount />
      </div>
      <WidgetWithGraphs />
      <form>
        <input />
      </form>
    </>
  );
};

export default MainPage;
