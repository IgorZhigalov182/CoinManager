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
import { paginate } from '../utils/paginate';
import Pagination from '../components/ui/Pagination';

const Operations = ({ route }) => {
  const [modalActive, setModalActive] = useState(false);
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  let operations = useSelector(getOperationList());
  const location = useLocation();
  const typeOperation = location.state?.title;
  const typeHandler = location.state?.handle;
  const dispatch = useDispatch();
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
      {/* <ListOperations operations={operations} /> */}
      <ListOperations operations={operationsCrop} />
      <NewOperation
        typeOperationForModal={typeOperationForModal}
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
      <div className="d-flex justify-content-center">
        {/* <Pagination
          itemsCount={4}
          pageSize={4}
          currentPage={4}
          // onPageChange={handlePageChange}
        /> */}
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
