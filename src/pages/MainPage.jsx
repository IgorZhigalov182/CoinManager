import React from 'react';
import CardProfit from '../components/ui/CardProfit';
import ListBankAccounts from '../components/ui/ListBankAccounts';

const MainPage = () => {
  return (
    <div className="container">
      <div class="row">
        <CardProfit title={'Доходы'} />
        <CardProfit title={'Расходы'} />
        <ListBankAccounts />
      </div>
    </div>
  );
};

export default MainPage;
