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

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    data.id = Date.now();
    console.log(data);
  };

  return (
    <div>
      <form id="operationForm" onSubmit={handleSubmit} action="">
        <NumberField name="sum" onChange={handleChange} htmlFor="operationForm" label="Сумма" />
        <SelectField
          name="category"
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

        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default NewOperation;
