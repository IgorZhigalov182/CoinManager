import React, { useEffect, useState } from 'react';
import CardOperation from '../components/ui/CardOperation';
import BackButton from '../components/ui/common/BackButton';
import { useLocation } from 'react-router-dom';

const Operation = () => {
  const [operations, setOperations] = useState();
  // const [operation, setOperation] = useState();
  const { pathname } = useLocation();
  const operationId = pathname.split('/')[2];

  useEffect(() => {
    setOperations(getDataOperations());
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

  return (
    <div className="container">
      <BackButton />
      <h1>Хлебные крошки</h1>
      <CardOperation />
    </div>
  );
};

export default Operation;
