import React from 'react';
import CardOperation from './ui/CardOperation';
import { Outlet } from 'react-router-dom';

const ListOperations = ({ operations }) => {
  // потом заменить на Redux operations
  return (
    <>
      {operations &&
        operations.map((operation) => {
          return <CardOperation key={operation.id} {...operation} />;
        })}
      {/* <Outlet /> */}
    </>
  );
};

export default ListOperations;
