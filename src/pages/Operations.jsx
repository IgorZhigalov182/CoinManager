import React, { useEffect, useState } from 'react';
import CardOperation from '../components/ui/CardOperation';
import ListOperations from '../components/ListOperations';
import { getDataOperationsd } from '../services/operations.services';
import { useDispatch, useSelector } from 'react-redux';
import { getOpetations } from '../store/operations/operations.slice';
import Button from '../components/ui/common/Button';

const Operations = () => {
  const [operations, setOperations] = useState();
  const operS = useSelector(getOpetations());
  // console.log(operS);

  const handleSort = (arr) => {
    const newArr = arr.sort((a, b) => {
      if (+a.sum > +b.sum) {
        return 1;
      } else {
        return -1;
      }
    });
    setOperations(newArr);
    console.log(operations);
  };

  useEffect(() => {
    getDataOperations();
    // setOperations(getDataOperations());
  }, []);

  const getDataOperations = async () => {
    try {
      const response = await fetch('http://localhost:3000/operations');
      const operations = await response.json();
      setOperations(operations);
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(operations);

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
