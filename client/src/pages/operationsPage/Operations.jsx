import React, { useEffect, useState } from 'react';
import ListOperations from '../../components/ui/listOperations/ListOperations';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterTypeOperations,
  getOperationList,
  sortOperationsByDate,
  sortOperationsBySum
} from '../../store/operations/operations.slice';
import Button from '../../components/ui/common/button/Button';
import { useLocation } from 'react-router-dom';
import { paginate } from '../../utils/paginate';
import Pagination from '../../components/ui/pagination/Pagination';
import ModalWindowOperation from '../../components/ui/ModalWindowOperation/ModalWindowOperation';
import localStorageService from '../../services/localStorage.services';
import style from './opertaions.module.scss';

const Operations = ({}) => {
  const [modalActive, setModalActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(false);
  let operations = useSelector(getOperationList());
  const location = useLocation();
  const dispatch = useDispatch();
  const pageSize = 6;
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
  const handleSortBySum = () => {
    dispatch(sortOperationsBySum());
    setSortBy(!sortBy);
  };
  const handleSortByDate = () => dispatch(sortOperationsByDate());

  return (
    <div className={style.operationWrap}>
      <Button
        handler={handleModal}
        title={'Добавить операцию'}
        spanStyle={style.spanAddOperation}
        className={style.btnAddOperation}
      />
      <span className={style.sortSpan}>Cортировка по:</span>
      <div className={style.operationButtonsWrap}>
        <Button
          title={sortBy ? 'сумме ▲' : 'сумме ▼'}
          spanStyle={style.spanSortBy}
          className={style.btnSortBy}
          handler={() => handleSortBySum()}
        />
        <Button
          title={'дате'}
          spanStyle={style.spanSortBy}
          className={style.btnSortBy}
          handler={() => handleSortByDate()}
        />
      </div>
      <ListOperations operations={operationsCrop} />
      <ModalWindowOperation
        typeOperationForModal={typeOperationForModal}
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
      <div className={style.paginationWrapper}>
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
