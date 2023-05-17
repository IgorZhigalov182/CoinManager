import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const CardOperation = ({ idBankAccount, category, comment, id }) => {
  const navigate = useNavigate();

  const handleGoToRecord = () => navigate(`/operation${id}`, { state: 'pathname' });

  return (
    <div className="card mb-2">
      <div className="card-body">
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

  // changeHobby: PropTypes.func,
  // index: PropTypes.number
};
