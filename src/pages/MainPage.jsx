import React from 'react';
import CardProfit from '../components/ui/CardProfit';
import ListBankAccounts from '../components/ui/ListBankAccounts';
import WidgetWithGraphs from '../components/ui/WidgetWithGraphs';

const MainPage = () => {
  return (
    <div className="container">
      <div class="row">
        <CardProfit title={'Доходы'} />
        <CardProfit title={'Расходы'} />
        <ListBankAccounts />
        <WidgetWithGraphs />
        {/* Добавить адаптивную перезагрузку виджета при добавлении новой операции */}
      </div>
    </div>
  );
};

export default MainPage;
