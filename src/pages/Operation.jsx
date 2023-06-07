import React from 'react';
import CardOperation from '../components/ui/CardOperation';
import BackButton from '../components/ui/common/BackButton';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOperationById } from '../store/operations/operations.slice';
import Button from '../components/ui/common/Button';
import NotFound from './NotFound';

const Operation = () => {
  const { pathname } = useLocation();
  const operationId = pathname.split('/')[2];
  const operation = useSelector(getOperationById(operationId));

  return (
    <>
      {operation ? (
        <div className="container">
          <BackButton />
          <h1>Хлебные крошки</h1>
          <CardOperation {...operation} />
          <Button title={'Изменить запись'} className={'btn btn-dark'} />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Operation;
