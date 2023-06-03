import React, { useEffect, useState } from 'react';
import CardOperation from '../components/ui/CardOperation';
import BackButton from '../components/ui/common/BackButton';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOperationById } from '../store/operations/operations.slice';

const Operation = () => {
  const { pathname } = useLocation();
  const operationId = pathname.split('/')[2];
  const operation = useSelector(getOperationById(operationId));

  return (
    <div className="container">
      <BackButton />
      <h1>Хлебные крошки</h1>
      <CardOperation {...operation} />
    </div>
  );
};

export default Operation;
