import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBuyDate, getBuyTime } from '../../services/date.services';
import { deleteOperationById } from '../../store/operations/operations.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryDisplayNameById } from '../../store/categories/categories.slice';

const CardOperation = ({ idBankAccount, category, comment, id, sum, date, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const categoryName = useSelector(getCategoryDisplayNameById(category));

  const operationPage = pathname.length < 12;

  const handleGoToRecord = () => navigate(`${id}`, { state: 'pathname' });

  const handleDelete = () => dispatch(deleteOperationById(id));

  console.log(categoryName);

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h3>{sum}Р</h3>
        <h4>Категория: {`${categoryName}`}</h4>
        <h4>{type}</h4>
        <h4>Дата покупки: {getBuyDate(date)}</h4>
        {!operationPage && <h5>Время покупки: {getBuyTime(date)}</h5>}
        {!operationPage && <h5 className="card-title">Банковский счёт: {idBankAccount}</h5>}
        <p className="card-text">Комментарий: {comment}</p>
        <div className="d-flex justify-content-between">
          {operationPage && <Button title={'Открыть запись'} handler={handleGoToRecord} />}
          {operationPage && (
            <Button className={'btn btn-danger'} title={'Удалить'} handler={handleDelete} />
          )}
        </div>
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
  sum: PropTypes.number,
};
