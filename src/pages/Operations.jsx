import React from 'react';
import ListOperations from '../components/ui/ListOperations';
import { useSelector } from 'react-redux';
import { getOperationList } from '../store/operations/operations.slice';
import Button from '../components/ui/common/Button';
import { useLocation } from 'react-router-dom';

const Operations = ({ route }) => {
  let operations = useSelector(getOperationList());
  const location = useLocation();
  const typeOperation = location.state;

  if (typeOperation === 'Доходы') {
    // Написать redusers с фильтрацией по типу: Доходы/Расходы
    [...operations].filter((operation) => {
      operation.type == 'profit';
      console.log(operation.type);
    });
  } else if (typeOperation === 'Расходы') {
    console.log('12');
  }

  const handleSort = (operations1) => {
    // console.log(operations1);
    const newArr = [...operations].sort((a, b) => {
      if (+a.sum < +b.sum) {
        return 1;
      } else {
        return -1;
      }
    });
    console.log(newArr);
    return newArr;
  };

  return (
    <div className="container">
      <Button title={'Сортировка'} className={'btn btn-dark mb-2'} handler={handleSort} />
      <ListOperations operations={operations} />
    </div>
  );
};

export default Operations;
