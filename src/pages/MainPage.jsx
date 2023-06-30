import React, { useEffect, useState } from 'react';
import CardProfit from '../components/ui/CardProfit';
import WidgetWithGraphs from '../components/ui/WidgetWithGraphs';
import WidgetBankAccount from '../components/ui/WidgetBankAccount';
import ModalWindow from '../components/ui/ModalWindow';
import Button from '../components/ui/common/Button';
import { timeStampToMonth } from '../services/date.services';
import { useDispatch, useSelector } from 'react-redux';
import { getCountOperationByMounth, loadOperationList } from '../store/operations/operations.slice';
import { loadCategoriesList } from '../store/categories/categories.slice';
import { loadBankAccountList } from '../store/bankAccounts/bankAccounts.slice';

const MainPage = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadCategoriesList());
  //   dispatch(loadBankAccountList());
  //   dispatch(loadOperationList());
  // }, []);

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
