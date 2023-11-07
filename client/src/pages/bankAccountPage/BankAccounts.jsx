import React, { useState } from 'react';
import Button from '../../components/ui/common/button/Button';
import ModalWindow from '../../components/ui/modalWindow/ModalWindow';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBankAccount,
  deleteBankAccountById,
  favouritedBankAccountById,
  getBankAccountList,
  updatedBankAccountById,
} from '../../store/bankAccounts/bankAccounts.slice';
import bankAccountService from '../../services/bankAccount.services';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ListBankAccounts from '../../components/ui/listBankAccounts/ListBankAccounts';
import style from './bankAccount.module.scss';

let bankAccountData = {
  name: '',
  bank: '',
  active: false,
  typeAccount: '',
};

const BankAccounts = () => {
  const [modalActive, setModalActive] = useState(false);
  const [initialValue, setInitialValue] = useState(bankAccountData);

  let bankAccounts = useSelector(getBankAccountList());
  const dispatch = useDispatch();

  const handleModal = (id) => {
    if (typeof id == 'string') {
      setInitialValue([...bankAccounts].filter((account) => account._id == id)[0]);
    }
    setModalActive(!modalActive);
  };

  const handleDelete = async (id) => {
    try {
      const dicision = confirm('Точно удалить?');
      if (dicision) {
        dispatch(deleteBankAccountById(id, bankAccounts));
        setModalActive(!modalActive);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavourite = async (id) => {
    try {
      bankAccountService.resetFavouritesBankAccount(bankAccounts);
      bankAccountService.doBankAccountFavourite(id, bankAccounts);
      dispatch(favouritedBankAccountById(id));
    } catch (error) {}
  };

  const handleSubmit = async (data) => {
    if (data._id) {
      dispatch(updatedBankAccountById(data, bankAccounts));
    } else {
      dispatch(createBankAccount(data, bankAccounts));
      setInitialValue(bankAccountData);
    }
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
    typeAccount: Yup.string().required('Обязательное поле'),
  });

  return (
    <div className={style.card_inner}>
      <Button
        title={'Добавить счёт'}
        className={'btn btn-dark mt-2 mb-2'}
        handler={() => {
          setModalActive(!modalActive);
          setInitialValue(bankAccountData);
        }}
      />
      <ListBankAccounts
        bankAccounts={bankAccounts}
        setModalActive={handleModal}
        toggleFavourite={handleFavourite}
      />
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <Formik
          validationSchema={bankAccountSchema}
          onSubmit={async (values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
          enableReinitialize={true}
          initialValues={initialValue}>
          {({ errors, touched }) => (
            <Form className="modalFormWrapper">
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Название счёта"
              />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
              <Field type="text" name="bank" className="form-control mt-2" placeholder="Банк" />
              {errors.bank && touched.bank ? <div>{errors.bank}</div> : null}
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
                {errors.typeAccount && touched.typeAccount ? <div>{errors.typeAccount}</div> : null}
              </div>

              {initialValue._id ? (
                <div className="d-flex justify-content-between">
                  <Button title="Изменить" type={'submit'} className={'btn btn-primary mt-3'} />
                  <Button
                    title="Удалить"
                    type={'button'}
                    handler={() => handleDelete(initialValue._id)}
                    className={'btn btn-danger mt-3 ms-3'}
                  />
                </div>
              ) : (
                <Button title="Добавить" type={'submit'} className="modalFormBtn" />
              )}
            </Form>
          )}
        </Formik>
      </ModalWindow>
    </div>
  );
};

export default BankAccounts;
