import React from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

const CardOperation = ({ idBankAccount, category, comment, id, sum }) => {
  const navigate = useNavigate();
  // console.log(operation);
  // console.log(idBankAccount);

  const handleGoToRecord = () => navigate(`${id}`, { state: 'pathname' });

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h3>{sum}Р</h3>
        <h4>Категория: {category}</h4>
        <h5 className="card-title">Банковский счёт: {idBankAccount}</h5>
        <p className="card-text">Комментарий: {comment}</p>
        <Button title={'Открыть запись'} handler={handleGoToRecord} />
      </div>
    </div>
  );
};

export default CardOperation;

CardOperation.propTypes = {
  idBankAccount: PropTypes.string,
  category: PropTypes.string,
  comment: PropTypes.string,
  id: PropTypes.number,
  sum: PropTypes.string,
};
