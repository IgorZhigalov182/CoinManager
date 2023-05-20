import React, { useEffect, useMemo, useState } from 'react';
import CardOperation from '../components/ui/CardOperation';
import BackButton from '../components/ui/common/BackButton';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOperationById, getOperationU } from '../store/operations/operations.slice';

const Operation = () => {
  // const [operation, setOperation] = useState();
  const { pathname } = useLocation();
  const operationId = pathname.split('/')[2];
  const dispatch = useDispatch();
  const operation = useSelector(getOperationU());

  console.log(operation);
  useEffect(() => {
    dispatch(getOperationById(operationId));
  }, []);

  // const operations = useSelector(getOperationList());

  // useEffect(() => {
  //   dispatch(loadOperationList());
  // }, []);

  // useEffect(() => {
  //   setOperation(q);
  // }, []);

  // useEffect(() => {
  // const state = dispatch(getOperationById(operationId));
  // console.log(state);
  // }, []);

  return (
    <div className="container">
      <BackButton />
      <h1>Хлебные крошки</h1>
      <CardOperation operation={operation} />
    </div>
  );
};

export default Operation;
