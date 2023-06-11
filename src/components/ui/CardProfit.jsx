import React, { useState } from 'react';
import Button from './common/Button';
import { useNavigate } from 'react-router-dom';

const CardProfit = ({ title }) => {
  const navigate = useNavigate();

  const handleOperationList = () => {
    navigate('/operations', { state: title });
  };

  // Добавить редирект на добавление новой операции (добавляя в state тип операции, чтобы)
  // пользователю не пришлось выбирать вручную

  return (
    <>
      <div className="col-sm-4 mt-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">Количество операций:</p>
            <p className="card-text">Общая сумма</p>
            <div className="d-flex justify-content-between">
              <Button title={'Открыть список'} handler={handleOperationList} />
              <Button title={'Добавить'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProfit;
