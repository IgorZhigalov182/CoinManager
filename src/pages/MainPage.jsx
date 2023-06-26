import React, { useState } from 'react';
import CardProfit from '../components/ui/CardProfit';
import WidgetWithGraphs from '../components/ui/WidgetWithGraphs';
import WidgetBankAccount from '../components/ui/WidgetBankAccount';
import ModalWindow from '../components/ui/ModalWindow';
import Button from '../components/ui/common/Button';
import { timeStampToMonth } from '../services/date.services';
import { useSelector } from 'react-redux';
import { getCountOperationByMounth } from '../store/operations/operations.slice';

const MainPage = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <CardProfit title={'Доходы'} />
          <CardProfit title={'Расходы'} />
          <WidgetBankAccount />
          <WidgetWithGraphs />
          {/* Добавить адаптивную перезагрузку виджета при добавлении новой операции */}
        </div>
      </div>
    </>
  );
};

export default MainPage;
