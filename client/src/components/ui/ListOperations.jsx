import React from 'react';
import PropTypes from 'prop-types';
import CardOperation from './cardOperation/CardOperation';

const ListOperations = ({ operations }) => {
  return (
    <>
      {operations &&
        operations.map((operation) => {
          return <CardOperation key={operation._id} {...operation} />;
        })}
    </>
  );
};

ListOperations.propTypes = {
  operations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ListOperations;
