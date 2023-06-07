import React, { useState, useContext } from 'react';
import NumberField from '../components/forms/NumberField';
import SelectField from '../components/forms/SelectField';
import TextAreaFiled from '../components/forms/TextAreaFiled';
import Button from '../components/ui/common/Button';
import { nanoid } from '@reduxjs/toolkit';

const NewOperation = ({}) => {
  const [data, setData] = useState({
    idBankAccount: '12345',
    sum: '',
    category: '',
    comment: '',
    id: '',
  });

  const [operations, setOperations] = useState([]);

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    data.id = nanoid();
    data.date = Date.now();
    await addOperation(data);
  };

  const addOperation = async (operationData) => {
    fetch('http://localhost:3000/operations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(operationData),
    });
  };

  const getOperations = async () => {
    const response = await fetch('http://localhost:3000/operations');
    const oper = await response.json();
    setOperations(oper);
  };

  return (
    <div>
      <form id="operationForm" onSubmit={handleSubmit} action="">
        <NumberField name="sum" onChange={handleChange} htmlFor="operationForm" label="Сумма" />
        <SelectField
          name="category"
          defaultValue="выберите категорию"
          onChange={handleChange}
          htmlFor="operationForm"
          label="Категория"
        />
        <TextAreaFiled
          name={'comment'}
          onChange={handleChange}
          htmlFor="operationForm"
          label="Комментарий"
        />

        <Button title="Отправить" type={'submit'} className={'btn btn-primary mt-2'} />
      </form>
      <Button
        handler={getOperations}
        className={'btn btn-primary mt-2'}
        title={'Получить операции из БД'}
      />

      {/* <ChartJSs someData={operations} /> */}
    </div>
  );
};

export default NewOperation;
