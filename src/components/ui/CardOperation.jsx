import React from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBuyDate, getBuyTime } from '../../services/date.services';

const CardOperation = ({ idBankAccount, category, comment, id, sum, date, type }) => {
  const navigate = useNavigate();
  let { pathname } = useLocation();

  const operationPage = pathname.length < 12;

  const handleGoToRecord = () => navigate(`${id}`, { state: 'pathname' });

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h3>{sum}Р</h3>
        <h4>Категория: {category}</h4>
        <h4>{type}</h4>
        <h4>Дата покупки: {getBuyDate(date)}</h4>
        {!operationPage && <h5>Время покупки: {getBuyTime(date)}</h5>}
        {!operationPage && <h5 className="card-title">Банковский счёт: {idBankAccount}</h5>}
        <p className="card-text">Комментарий: {comment}</p>
        {operationPage && <Button title={'Открыть запись'} handler={handleGoToRecord} />}
      </div>
    </div>
  );
};

export default CardOperation;

CardOperation.propTypes = {
  idBankAccount: PropTypes.string,
  category: PropTypes.string,
  comment: PropTypes.string,
  id: PropTypes.string,
  sum: PropTypes.string,
};
