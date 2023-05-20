import React, { useEffect, useState } from 'react';
import ListOperations from '../components/ListOperations';
import { useDispatch, useSelector } from 'react-redux';
import { getOperationList, loadOperationList } from '../store/operations/operations.slice';
import Button from '../components/ui/common/Button';

const Operations = () => {
  const dispatch = useDispatch();
  const operations = useSelector(getOperationList());

  useEffect(() => {
    dispatch(loadOperationList());
  }, []);

  const handleSort = (arr) => {
    const newArr = arr.sort((a, b) => {
      if (+a.sum > +b.sum) {
        return 1;
      } else {
        return -1;
      }
    });
  };

  return (
    <div className="container">
      <Button
        title={'Сортировка'}
        className={'btn btn-dark mb-2'}
        handler={() => handleSort(operations)}
        // handler={handleSort}
      />
      <ListOperations operations={operations} />
    </div>
  );
};

export default Operations;
