import React, { useEffect, useState } from 'react';
import ListOperations from '../components/ListOperations';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOperationList,
  loadOperationList,
  sortOperations,
} from '../store/operations/operations.slice';
import Button from '../components/ui/common/Button';

const Operations = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadOperationList());
  // }, []);

  let operations = useSelector(getOperationList());

  const handleSort = (operations1) => {
    console.log(operations1);
    const newArr = [...operations1].sort((a, b) => {
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
      <Button
        title={'Сортировка'}
        className={'btn btn-dark mb-2'}
        handler={() => handleSort(operations)}
      />
      <ListOperations operations={operations} />
    </div>
  );
};

export default Operations;
