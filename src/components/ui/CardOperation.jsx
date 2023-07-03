import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBuyDate, getBuyTime } from '../../services/date.services';
import { deleteOperationById } from '../../store/operations/operations.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryDisplayNameById } from '../../store/categories/categories.slice';
import Badge from './common/Badge';
import { getBankAccountDisplayNameById } from '../../store/bankAccounts/bankAccounts.slice';

const CardOperation = ({ idBankAccount, category, comment, _id, sum, date, typeOperation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const categoryName = useSelector(getCategoryDisplayNameById(category));
  const bankAccountName = useSelector(getBankAccountDisplayNameById(idBankAccount));

  const operationPage = pathname.length < 12;

  const handleGoToRecord = () => navigate(`${_id}`, { state: 'pathname' });

  const handleDelete = () => dispatch(deleteOperationById(_id));

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h3>
          {typeOperation === 'profit' ? (
            <Badge title={`${sum}Р`} className="badge text-bg-success" />
          ) : (
            <Badge title={`${sum}Р`} className="badge text-bg-secondary" />
          )}
        </h3>
        <h5>Категория: {categoryName}</h5>
        {!operationPage && (
          <h5>Тип операции: {typeOperation === 'profit' ? 'Доходы' : 'Расходы'}</h5>
        )}
        <h6>Дата покупки: {getBuyDate(date)}</h6>
        {!operationPage && <h5>Время покупки: {getBuyTime(date)}</h5>}
        {!operationPage && <h5 className="card-title">Банковский счёт: {bankAccountName}</h5>}
        {!operationPage && <p className="card-text">Комментарий: {comment}</p>}
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
