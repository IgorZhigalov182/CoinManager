import React, { useState, useContext } from 'react';
import NumberField from '../forms/NumberField';
import SelectField from '../forms/SelectField';
import TextAreaFiled from '../forms/TextAreaFiled';
import Button from './common/Button';
import { nanoid } from '@reduxjs/toolkit';
import '../../styles/modal.css';
import ModalWindow from './ModalWindow';
import { categories } from '../../data/categories';
import { addOperation } from '../../services/operations.services';

const NewOperation = ({}) => {
  const [data, setData] = useState({
    idBankAccount: '12345',
    sum: '',
    category: '',
    comment: '',
    id: '',
  });

  const [modalActive, setModalActive] = useState(false);
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

  // const addOperation = async (operationData) => {
  //   fetch('http://localhost:3000/operations', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     body: JSON.stringify(operationData),
  //   });
  // };

  const handleModal = () => {
    setModalActive(!modalActive);
  };

  return (
    <div>
      {/* <form id="operationForm" onSubmit={handleSubmit} action="">
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
        <h3>ДОБАВИТЬ ТИП ОПЕРАЦИИ РАСХОД ИЛИ ДОХОД</h3>
      </form> */}
      {/* <Button
        handler={getOperations}
        className={'btn btn-primary mt-2'}
        title={'Получить операции из БД'}
      /> */}
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <form id="operationForm" onSubmit={handleSubmit} action="">
          <NumberField name="sum" onChange={handleChange} htmlFor="operationForm" label="Сумма" />
          <SelectField
            name="category"
            defaultValue="выберите категорию"
            onChange={handleChange}
            htmlFor="operationForm"
            label="Категория"
            list={categories}
          />
          <TextAreaFiled
            name={'comment'}
            onChange={handleChange}
            htmlFor="operationForm"
            label="Комментарий"
          />
          <Button title="Отправить" type={'submit'} className={'btn btn-primary mt-2'} />
        </form>
      </ModalWindow>
      <Button
        handler={handleModal}
        title={'Добавить операцию'}
        className={'btn btn-primary mt-2'}
      />
    </div>
  );
};

export default NewOperation;