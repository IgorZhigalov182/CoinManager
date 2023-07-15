import React from 'react';
import CardProfit from '../../components/ui/CardProfit';
import WidgetWithGraphs from '../../components/ui/WidgetWithGraphs';
import WidgetBankAccount from '../../components/ui/WidgetBankAccount';

const MainPage = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <CardProfit title={'Доходы'} />
          <CardProfit title={'Расходы'} />
          <WidgetBankAccount />
          <WidgetWithGraphs />
        </div>
      </div>
    </>
  );
};

export default MainPage;
