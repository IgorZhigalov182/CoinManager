import React, { useState, useEffect } from 'react';
import CardBankAccount from '../components/ui/CardBankAccount';
import Button from '../components/ui/common/Button';
import ModalWindow from '../components/ui/ModalWindow';
import TextAreaFiled from '../components/forms/TextAreaFiled';
import TextField from '../components/forms/TextField';
import { useSelector } from 'react-redux';
import { getBankAccountList } from '../store/bankAccounts/bankAccounts.slice';
import SelectField from '../components/forms/SelectField';
import { addBankAccount } from '../services/bankAccount.services';
import { nanoid } from '@reduxjs/toolkit';
import CheckField from '../components/forms/CheckField';

const BankAccounts = () => {
  const [modalActive, setModalActive] = useState(false);
  const [data, setData] = useState({
    name: '',
    typeAccount: '',
    comment: '',
    bank: '',
  });

  let bankAccounts = useSelector(getBankAccountList());

  const handleModal = () => {
    setModalActive(!modalActive);
  };

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
    await addBankAccount(data);
    setModalActive(!modalActive);
  };

  return (
    <div className="container">
      <Button title={'Добавить счёт'} className={'btn btn-dark mb-2'} handler={handleModal} />
      {bankAccounts &&
        bankAccounts.map((bankData) => {
          return <CardBankAccount {...bankData} key={bankData.id} />;
        })}
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <form id="bankAccountForm" onSubmit={handleSubmit} action="">
          <TextField
            name={'name'}
            onChange={handleChange}
            label="Название счёта"
            htmlFor="bankAccountForm"
          />
          <TextField name={'bank'} onChange={handleChange} label="Банк" htmlFor="bankAccountForm" />
          <TextAreaFiled
            name={'comment'}
            onChange={handleChange}
            htmlFor="bankAccountForm"
            label="Комментарий (не обязательно)"
          />
          <CheckField />
          {/* <SelectField list={bankAccounts} /> */}
          <Button title="Добавить" type={'submit'} className={'btn btn-primary mt-2'} />
        </form>
      </ModalWindow>
    </div>
  );
};

export default BankAccounts;
