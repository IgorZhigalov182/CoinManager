import React from 'react';
import CardOperation from './CardOperation';

const ListOperations = ({ operations }) => {
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