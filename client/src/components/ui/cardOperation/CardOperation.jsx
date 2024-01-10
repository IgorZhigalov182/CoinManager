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
import classNames from 'classnames';

const CardOperation = ({ idBankAccount, category, comment, _id, sum, date, typeOperation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const categoryName = useSelector(getCategoryDisplayNameById(category));
  const bankAccountName = useSelector(getBankAccountDisplayNameById(idBankAccount));

  const isOperationPage = pathname.length < 12;

  const styleCardWrapper = classNames(
    isOperationPage ? style.card_wrapper : style.card_wrapperOperationPage
  );

  const styleBadge = classNames(
    typeOperation === 'profit' ? style.profitBadge : style.expanseBadge
  );

  const handleGoToRecord = () => navigate(`${_id}`, { state: 'pathname' });

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteOperationById(_id));
  };

  return (
    <div onClick={isOperationPage ? () => handleGoToRecord() : ''} className={styleCardWrapper}>
      <Badge title={`${sum}Р`} className={styleBadge} />
      <div>
        <h5 className={style.profitH5}>Категория: {categoryName}</h5>
        {!isOperationPage && (
          <h5>Тип операции: {typeOperation === 'profit' ? 'Доходы' : 'Расходы'}</h5>
        )}
        <h6>Дата операции: {getBuyDate(date)}</h6>
        {!isOperationPage && <h5>Время покупки: {getBuyTime(date)}</h5>}
        {!isOperationPage && <h5 className="card-title">Банковский счёт: {bankAccountName}</h5>}
        {!isOperationPage && <p className={style.cardOperationComment}>Комментарий: {comment}</p>}
        <div className={style.cardOperationButtonWraper}>
          {isOperationPage && (
            <Button
              spanStyle={style.spanGoToRecord}
              className={style.btnGoToRecord}
              title={<i className="fa-solid fa-arrow-up-right-from-square"></i>}
              handler={handleGoToRecord}
            />
          )}
          {isOperationPage && (
            <Button
              className={style.btnDeleteRecord}
              spanStyle={style.spanDeleteRecord}
              title={<i className="fa-solid fa-trash"></i>}
              handler={handleDelete}
            />
          )}
        </div>
        {!isOperationPage && <h5>Время покупки: {getBuyTime(date)}</h5>}
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
  typeOperation: PropTypes.string
};
