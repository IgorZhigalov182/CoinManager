import React, { useState } from 'react';
import CardProfit from '../components/ui/CardProfit';
import ListBankAccounts from '../components/ui/ListBankAccounts';
import WidgetWithGraphs from '../components/ui/WidgetWithGraphs';
import WidgetBankAccount from '../components/ui/WidgetBankAccount';
import ModalWindow from '../components/ui/ModalWindow';
import Button from '../components/ui/common/Button';

const MainPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const handleModal = () => setModalActive(!modalActive);

  return (
    <>
      <Button handler={handleModal} />
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <h1>w</h1>
      </ModalWindow>
      <div className="container">
        <div class="row">
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
