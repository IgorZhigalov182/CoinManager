import React, { useEffect, useState } from 'react';
import ListOperations from '../components/ui/ListOperations';
import { useSelector } from 'react-redux';
import {
  filterTypeOperations,
  getOperationList,
  getOperationsLoadingStatus,
} from '../store/operations/operations.slice';
import Button from '../components/ui/common/Button';
import { useLocation } from 'react-router-dom';
import NewOperation from '../components/ui/NewOperation';
import ModalWindow from '../components/ui/ModalWindow';

const Operations = ({ route }) => {
  const [state, setState] = useState(0);
  let operations = useSelector(getOperationList());
  const location = useLocation();
  const typeOperation = location.state;

  // Вызов хуков в условии, но благодаря последнему else кол-во хуков будет всегда одинаковое и рендер не сломается
  if (typeOperation === 'Доходы') {
    operations = useSelector(filterTypeOperations('profit'));
  } else if (typeOperation === 'Расходы') {
    operations = useSelector(filterTypeOperations('expense'));
  } else {
    operations = useSelector(filterTypeOperations('Все'));
  }

  const handleSort = () => {
    setState((prevState) => prevState + 1);
    console.log(state);
    return (operations = [...operations].sort((a, b) => {
      if (+a.sum < +b.sum) {
        return 1;
      } else {
        return -1;
      }
    }));
  };

  return (
    <div className="container">
      <Button title={'Сортировка'} className={'btn btn-dark mb-2'} handler={() => handleSort()} />
      {/* <NewOperation /> */}
      <ListOperations operations={operations} />
    </div>
  );
};

export default Operations;
