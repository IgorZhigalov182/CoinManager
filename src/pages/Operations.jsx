import React, { useEffect, useState } from 'react';
import ListOperations from '../components/ui/ListOperations';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterTypeOperations,
  getOperationList,
  getOperationsLoadingStatus,
  sortOperations,
} from '../store/operations/operations.slice';
import Button from '../components/ui/common/Button';
import { useLocation } from 'react-router-dom';
import NewOperation from '../components/ui/NewOperation';
import ModalWindow from '../components/ui/ModalWindow';

const Operations = ({ route }) => {
  const [state, setState] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  let operations = useSelector(getOperationList());
  const location = useLocation();
  const typeOperation = location.state;
  const dispatch = useDispatch();

  const handleModal = () => {
    // inputSum.current.focus();
    setModalActive(!modalActive);
  };

  // Вызов хуков в условии, но благодаря последнему else кол-во хуков будет всегда одинаковое и рендер не сломается
  if (typeOperation === 'Доходы') {
    operations = useSelector(filterTypeOperations('profit'));
  } else if (typeOperation === 'Расходы') {
    operations = useSelector(filterTypeOperations('expense'));
  } else {
    operations = useSelector(filterTypeOperations('Все'));
  }

  const handleSort = () => dispatch(sortOperations());

  return (
    <div className="container">
      <Button
        handler={handleModal}
        title={'Добавить операцию'}
        className={'btn btn-primary mt-1 mb-2 me-2'}
      />
      <Button
        title={'Сортировка'}
        className={'btn btn-dark mt-1 mb-2'}
        handler={() => handleSort()}
      />
      <ListOperations operations={operations} />
      <NewOperation modalActive={modalActive} setModalActive={setModalActive} />
    </div>
  );
};

export default Operations;
