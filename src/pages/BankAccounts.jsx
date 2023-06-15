import React, { useState, useEffect } from 'react';
import CardBankAccount from '../components/ui/CardBankAccount';
import Button from '../components/ui/common/Button';
import ModalWindow from '../components/ui/ModalWindow';
import TextAreaFiled from '../components/forms/TextAreaFiled';
import TextField from '../components/forms/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { getBankAccountById, getBankAccountList } from '../store/bankAccounts/bankAccounts.slice';
import SelectField from '../components/forms/SelectField';
import { addBankAccount } from '../services/bankAccount.services';
import { nanoid } from '@reduxjs/toolkit';
import CheckField from '../components/forms/CheckField';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ListBankAccounts from '../components/ui/ListBankAccounts';

let bankAccountData = {
  name: '',
  bank: '',
  comment: '',
  active: false,
  typeAccount: '',
};

const BankAccounts = () => {
  const [modalActive, setModalActive] = useState(false);
  const [initialValue, setInitialValue] = useState(bankAccountData);

  let bankAccounts = useSelector(getBankAccountList());

  const handleModal = (id) => {
    if (typeof id == 'string') {
      setInitialValue([...bankAccounts].filter((account) => account.id == id)[0]);
    }
    setModalActive(!modalActive);
  };
  // const handleChange = ({ target }) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value,
  //   }));
  // };

  const handleSubmit = async (data) => {
    data.id = nanoid();
    data.date = Date.now();
    await addBankAccount(data);
    setModalActive(!modalActive);
  };

  const bankAccountSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Минимум 2 буквы')
      .max(50, 'Максимум 50 букв')
      .required('Обязательное поле'),
    bank: Yup.string()
      .min(2, 'Минимум 2 буквы')
      .max(50, 'Максимум 50 букв')
      .required('Обязательное поле'),
    // email: Yup.string().email('Неверный email').required('Обязательное поле'),
  });

  return (
    <div className="container">
      <Button title={'Добавить счёт'} className={'btn btn-dark mb-2'} handler={handleModal} />
      <ListBankAccounts bankAccounts={bankAccounts} setModalActive={handleModal} />
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <Formik
          validationSchema={bankAccountSchema}
          onSubmit={async (values, actions) => handleSubmit(values)}
          enableReinitialize={true}
          initialValues={initialValue}>
          {({ errors, touched }) => (
            <Form>
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Название счёта"
              />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
              <Field type="text" name="bank" className="form-control mt-2" placeholder="Банк" />
              {errors.bank && touched.bank ? <div>{errors.bank}</div> : null}
              <Field
                type="textarea"
                name="comment"
                className="form-control mt-2"
                placeholder="Комментарий"
              />

              <label className="mt-2 mb-2">
                Основной счёт
                <Field type="checkbox" name="active" className="form-check-input ms-2" />
              </label>

              <div>Тип счёта:</div>
              <div role="group" aria-labelledby="my-radio-group" className="mt-1">
                <div>
                  <Field
                    type="radio"
                    className="form-check-input"
                    name="typeAccount"
                    value="current"
                  />
                  <span className="ms-2">Текущий</span>
                </div>
                <div>
                  <Field
                    type="radio"
                    className="form-check-input"
                    name="typeAccount"
                    value="credit"
                  />
                  <span className="ms-2">Кредитный</span>
                </div>
                <div>
                  <Field
                    type="radio"
                    className="form-check-input"
                    name="typeAccount"
                    value="estimated"
                  />
                  <span className="ms-2">Расчётный (для ИП)</span>
                </div>
              </div>

              <div>
                <Button title="Добавить" type={'submit'} className={'btn btn-primary mt-3'} />
              </div>
            </Form>
          )}
        </Formik>

        {/* <form id="bankAccountForm" onSubmit={handleSubmit} action=""> */}
        {/* <TextField
            name={'name'}
            onChange={handleChange}
            label="Название счёта"
            htmlFor="bankAccountForm"
          /> */}
        {/* <TextField name={'bank'} onChange={handleChange} label="Банк" htmlFor="bankAccountForm" /> */}
        {/* <TextAreaFiled
            name={'comment'}
            onChange={handleChange}
            htmlFor="bankAccountForm"
            label="Комментарий (не обязательно)"
          /> */}
        {/* <CheckField /> */}
        {/* <SelectField list={bankAccounts} /> */}
        {/* <Button title="Добавить" type={'submit'} className={'btn btn-primary mt-2'} /> */}
        {/* </form> */}
      </ModalWindow>
    </div>
  );
};

export default BankAccounts;
