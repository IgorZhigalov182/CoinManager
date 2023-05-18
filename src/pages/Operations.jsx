import React, { useEffect, useState } from 'react';
import CardOperation from '../components/ui/CardOperation';
import ListOperations from '../components/ListOperations';

const Operations = () => {
  const [operations, setOperations] = useState();

  useEffect(() => {
    getDataOperations();
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
      <ListOperations operations={operations} />
    </div>
  );
};

export default Operations;
