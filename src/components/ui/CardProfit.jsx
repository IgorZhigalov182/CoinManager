import React from 'react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

const CardProfit = ({ title }) => {
  const navigate = useNavigate();

  const openOperationList = () => {
    navigate('/operations', { state: title });
  };

  return (
    <div className="col-sm-4 mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Количество операций:</p>
          <p className="card-text">Общая сумма</p>
          <div className="d-flex justify-content-between">
            <Button title={'Открыть список'} handler={openOperationList} />
            <Button title={'Добавить'} handler={openOperationList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProfit;
