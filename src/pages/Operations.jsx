import React, { useEffect, useState } from 'react';
import ListOperations from '../components/ui/ListOperations';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterTypeOperations,
  getOperationList,
  getOperationsLoadingStatus,
  loadOperationList,
  sortOperationsByDate,
  sortOperationsBySum,
} from '../store/operations/operations.slice';
import Button from '../components/ui/common/Button';
import { useLocation } from 'react-router-dom';
import NewOperation from '../components/ui/ModalWindowOperation';
import { paginate } from '../utils/paginate';
import Pagination from '../components/ui/Pagination';
import ModalWindowOperation from '../components/ui/ModalWindowOperation';
import localStorageService from '../services/localStorage.services';

const Operations = ({}) => {
  const [modalActive, setModalActive] = useState(false);
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  let operations = useSelector(getOperationList());
  // console.log(operations);
  const location = useLocation();
  const typeOperation = location.state?.title;
  const typeHandler = location.state?.handle;
  const dispatch = useDispatch();
  const userId = localStorageService.getUserId();
  let typeOperationForModal = typeOperation === 'Доходы' ? 'profit' : 'expense';

  const handleModal = () => {
    // inputSum.current.focus();
    setModalActive(!modalActive);
  };

  useEffect(() => {
    if (typeHandler === 'addModal') {
      typeOperationForModal = typeOperation;
      handleModal();
    }
  }, []);

  // Вызов хуков в условии, но благодаря последнему else кол-во хуков будет всегда одинаковое и рендер не сломается
  if (typeOperation === 'Доходы' && typeHandler === 'show') {
    operations = useSelector(filterTypeOperations('profit'));
  } else if (typeOperation === 'Расходы' && typeHandler === 'show') {
    operations = useSelector(filterTypeOperations('expense'));
  } else {
    operations = useSelector(filterTypeOperations('Все'));
  }

  const count = operations.length;

  const operationsCrop = paginate(operations, currentPage, pageSize);

  const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);

  const handleSortBySum = () => dispatch(sortOperationsBySum());
  const handleSortByDate = () => dispatch(sortOperationsByDate());

  return (
    <div className="container">
      <Button
        handler={handleModal}
        title={'Добавить операцию'}
        className={'btn btn-primary mt-2 mb-2 me-2'}
      />
      <span className="me-2">Cортировка по:</span>
      <Button
        title={'сумме'}
        className={'btn btn-dark mt-1 mb-2 me-2'}
        handler={() => handleSortBySum()}
      />
      <Button
        title={'дате'}
        className={'btn btn-dark me-2 mt-1 mb-2'}
        handler={() => handleSortByDate()}
      />
      {/* <ListOperations operations={operations} /> */}
      <ListOperations operations={operationsCrop} />
      <ModalWindowOperation
        typeOperationForModal={typeOperationForModal}
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
      {/* <NewOperation
        typeOperationForModal={typeOperationForModal}
        modalActive={modalActive}
        setModalActive={setModalActive}
      /> */}
      <div className="d-flex justify-content-center">
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Operations;
