import React, { useState, useContext } from 'react';
import NumberField from '../components/forms/NumberField';
import SelectField from '../components/forms/SelectField';
import TextAreaFiled from '../components/forms/TextAreaFiled';
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
    data.id = Date.now();
    console.log(data);
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

        <button type="submit" className="btn btn-primary">
          Отправить
        </button>
      </form>

      <button handler={getOperations}>Получить операции из БД</button>
      {/* <ChartJSs someData={operations} /> */}
    </div>
  );
};

export default NewOperation;
