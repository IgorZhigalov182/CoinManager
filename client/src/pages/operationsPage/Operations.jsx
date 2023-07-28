import React, { useEffect, useState } from 'react';
import ListOperations from '../../components/ui/ListOperations';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterTypeOperations,
  getOperationList,
  sortOperationsByDate,
  sortOperationsBySum,
} from '../../store/operations/operations.slice';
import Button from '../../components/ui/common/button/Button';
import { useLocation } from 'react-router-dom';
import NewOperation from '../../components/ui/ModalWindowOperation';
import { paginate } from '../../utils/paginate';
import Pagination from '../../components/ui/Pagination';
import ModalWindowOperation from '../../components/ui/ModalWindowOperation';
import localStorageService from '../../services/localStorage.services';

const Operations = ({}) => {
  const [modalActive, setModalActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  let operations = useSelector(getOperationList());
  const location = useLocation();
  const dispatch = useDispatch();
  const pageSize = 3;
  const typeOperation = location.state?.title;
  const typeHandler = location.state?.handle;
  const userId = localStorageService.getUserId();
  let typeOperationForModal = typeOperation === 'Доходы' ? 'profit' : 'expense';

  const handleModal = () => setModalActive(!modalActive);

  useEffect(() => {
    if (typeHandler === 'addModal') {
      typeOperationForModal = typeOperation;
      handleModal();
    }
  }, []);

  if (typeOperation === 'Доходы' && typeHandler === 'show') {
    operations = useSelector(filterTypeOperations('profit'));
  } else if (typeOperation === 'Расходы' && typeHandler === 'show') {
    operations = useSelector(filterTypeOperations('expense'));
  } else {
    operations = useSelector(filterTypeOperations('Все'));
  }

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
      <ListOperations operations={operationsCrop} />
      <ModalWindowOperation
        typeOperationForModal={typeOperationForModal}
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
      <div className="d-flex justify-content-center">
        <Pagination
          itemsCount={operations.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Operations;
