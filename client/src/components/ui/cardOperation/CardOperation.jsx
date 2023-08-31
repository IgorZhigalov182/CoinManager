import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBuyDate, getBuyTime } from '../../../services/date.services';
import { deleteOperationById } from '../../../store/operations/operations.slice';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryDisplayNameById } from '../../../store/categories/categories.slice';
import Badge from '../common/badge/Badge';
import { getBankAccountDisplayNameById } from '../../../store/bankAccounts/bankAccounts.slice';
import style from './cardOperation.module.scss';

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
    <div className={style.card_wrapper}>
      {typeOperation === 'profit' ? (
        <Badge title={`${sum}Р`} className={style.profitBadge} />
      ) : (
        <Badge title={`${sum}Р`} className={style.expanseBadge} />
      )}
      <div>
        <h5 className={style.profitH5}>Категория: {categoryName}</h5>
        {!operationPage && (
          <h5>Тип операции: {typeOperation === 'profit' ? 'Доходы' : 'Расходы'}</h5>
        )}
        <h6>Дата операции: {getBuyDate(date)}</h6>
        {!operationPage && <h5>Время покупки: {getBuyTime(date)}</h5>}
        {!operationPage && <h5 className="card-title">Банковский счёт: {bankAccountName}</h5>}
        {!operationPage && <p className="card-text">Комментарий: {comment}</p>}
        <div className={style.cardOperationButtonWraper}>
          {operationPage && (
            <Button
              spanStyle={style.spanGoToRecord}
              className={style.btnGoToRecord}
              title={'Открыть запись'}
              handler={handleGoToRecord}
            />
          )}
          {operationPage && (
            <Button
              className={style.btnDeleteRecord}
              spanStyle={style.spanDeleteRecord}
              title={<i className="fa-solid fa-trash"></i>}
              handler={handleDelete}
            />
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
  _id: PropTypes.string,
  sum: PropTypes.number,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  typeOperation: PropTypes.string,
};
