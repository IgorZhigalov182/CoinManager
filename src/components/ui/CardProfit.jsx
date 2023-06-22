import React, { useState } from 'react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';
import ModalWindow from './ModalWindow';
import { useDispatch } from 'react-redux';
import { getCountOperations } from '../../store/operations/operations.slice';

const CardProfit = ({ title }) => {
  // const [modalActive, setModalActive] = useState(false);
  const handleModal = () => setModalActive(!modalActive);
  const dispatch = useDispatch();
  const countOperation = dispatch(getCountOperations(title));

  const navigate = useNavigate();

  const modalActive = '';
  const setModalActive = '';

  const handleOperationList = () =>
    navigate('/operations', { state: { title: title, handle: 'show' } });
  const handleAddOperation = () =>
    navigate('/operations', { state: { title: title, handle: 'addModal' } });

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
              <Button title={'Добавить'} handler={handleAddOperation} />
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
