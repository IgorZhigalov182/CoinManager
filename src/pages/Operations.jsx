import React, { useEffect, useState } from 'react';
import CardOperation from '../components/ui/CardOperation';

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
      {operations &&
        operations.map((operation) => {
          return <CardOperation key={operation.id} {...operation} />;
        })}
    </div>
  );
};

export default Operations;
