import React from 'react';
import PropTypes from 'prop-types';
import CardOperation from '../cardOperation/CardOperation';
import style from './ListOperations.module.scss';

const ListOperations = ({ operations }) => {
  return (
    <div className={style.listWrapper}>
      {operations &&
        operations.map((operation) => {
          return <CardOperation key={operation._id} {...operation} />;
        })}
    </div>
  );
};

ListOperations.propTypes = {
  operations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ListOperations;
