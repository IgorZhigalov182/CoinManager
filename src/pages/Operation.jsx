import React, { useEffect, useState } from 'react';
import CardOperation from '../components/ui/CardOperation';
import BackButton from '../components/ui/common/BackButton';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOperationById,
  getOperationsLoadingStatus,
  loadOperationList,
} from '../store/operations/operations.slice';
import Button from '../components/ui/common/Button';

const Operation = () => {
  const { pathname } = useLocation();
  const operationId = pathname.split('/')[2];
  const operation = useSelector(getOperationById(operationId));
  const isLoading = useSelector(getOperationsLoadingStatus());
  const dispatch = useDispatch();

  console.log(isLoading);

  useEffect(() => {
    dispatch(loadOperationList());
  }, []);

  return (
    <div className="container">
      <BackButton />
      <h1>Хлебные крошки</h1>
      <CardOperation {...operation} />
      <Button title={'Изменить запись'} className={'btn btn-dark'} />
    </div>
  );
};

export default Operation;
