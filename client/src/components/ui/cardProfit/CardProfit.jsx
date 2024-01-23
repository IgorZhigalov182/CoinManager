import React from 'react';
import Button from '../common/button/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCountOperations, getSumOperations } from '../../../store/operations/operations.slice';
import PropTypes from 'prop-types';
import styles from './cardProfit.module.scss';

const CardProfit = ({ title }) => {
  const countOperation = useSelector(getCountOperations(title));
  const sumOperation = useSelector(getSumOperations(title));

  const navigate = useNavigate();

  const handleOperationList = () =>
    navigate('/operations', { state: { title: title, handle: 'show' } });

  const handleAddOperation = () =>
    navigate('/operations', { state: { title: title, handle: 'addModal' } });

  return (
    <div className={styles.cardProfitWrapper}>
      <h5 className={styles.cardProfitTitle}>{title}</h5>
      <p className="card-text">Количество операций: {countOperation}</p>
      <p className="card-text">Общая сумма: {sumOperation}₽</p>
      <div className={styles.cardProfitButtonsWrapper}>
        <Button
          title={'Открыть список'}
          className={styles.btnCardProfit}
          handler={handleOperationList}
          spanStyle={styles.spanStyle}
        />
        <Button
          title={'Добавить'}
          className={styles.btnCardProfit}
          spanStyle={styles.spanStyle}
          handler={handleAddOperation}
        />
      </div>
    </div>
  );
};

export default CardProfit;

CardProfit.propTypes = {
  title: PropTypes.string
};
