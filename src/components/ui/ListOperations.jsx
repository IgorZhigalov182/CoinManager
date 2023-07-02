import React from 'react';
import CardOperation from './CardOperation';

const ListOperations = ({ operations }) => {
  return (
    <>
      {operations &&
        operations.map((operation) => {
          console.log(operation);
          return <CardOperation key={operation._id} {...operation} />;
        })}
    </>
  );
};

export default ListOperations;
