import React, { useState } from 'react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';
import ModalWindow from './ModalWindow';

const CardProfit = ({ title }) => {
  const [modalActive, setModalActive] = useState(false);
  const handleModal = () => setModalActive(!modalActive);

  const navigate = useNavigate();

  const handleOperationList = () => {
    navigate('/operations', { state: title });
  };

  // Добавить редирект на добавление новой операции (добавляя в state тип операции, чтобы)
  // пользователю не пришлось выбирать вручную

  return (
    <>
      <div className="col-sm-4 mt-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">Количество операций:</p>
            <p className="card-text">Общая сумма</p>
            <div className="d-flex justify-content-between">
              <Button title={'Открыть список'} handler={handleOperationList} />
              <Button title={'Добавить'} handler={handleModal} />
            </div>
          </div>
        </div>
      </div>
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <h1>s</h1>
      </ModalWindow>
    </>
  );
};

export default CardProfit;
