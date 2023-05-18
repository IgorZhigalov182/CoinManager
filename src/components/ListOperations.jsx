import React from 'react';
import CardOperation from './ui/CardOperation';

const ListOperations = ({ operations }) => {
  // потом заменить на Redux operations
  return (
    <>
      {operations &&
        operations.map((operation) => {
          return <CardOperation key={operation.id} {...operation} />;
        })}
    </>
  );
};

export default ListOperations;
