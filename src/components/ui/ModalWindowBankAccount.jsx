import React, { useState } from 'react';
import * as Yup from 'yup';
import ModalWindow from './ModalWindow';
import { Field, Form, Formik } from 'formik';
import Button from './common/Button';
import {
  createBankAccount,
  deleteBankAccountById,
  getBankAccountList,
  updatedBankAccountById,
} from '../../store/bankAccounts/bankAccounts.slice';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

let bankAccountData = {
  name: '',
  bank: '',
  comment: '',
  active: false,
  typeAccount: '',
};

const ModalWindowBankAccount = ({ active, setActive }) => {
  const [initialValue, setInitialValue] = useState(bankAccountData);
  const dispatch = useDispatch();
  let bankAccounts = useSelector(getBankAccountList());

  const handleDelete = async (id) => {
    try {
      const dicision = confirm('Точно удалить?');
      if (dicision) {
        dispatch(deleteBankAccountById(id, bankAccounts));
        setActive(!active);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (data) => {
    if (data._id) {
      dispatch(updatedBankAccountById(data, bankAccounts));
    } else {
      data.date = Date.now();
      dispatch(createBankAccount(data, bankAccounts));
      setInitialValue(bankAccountData);
    }
    setActive(!active);
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
    <ModalWindow active={active} setActive={setActive}>
      <Formik
        validationSchema={bankAccountSchema}
        onSubmit={async (values, actions) => {
          handleSubmit(values);
        }}
        enableReinitialize={true}
        initialValues={initialValue}>
        {({ errors, touched }) => (
          <Form>
            <Field type="text" name="name" className="form-control" placeholder="Название счёта" />
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
              {errors.typeAccount && touched.typeAccount ? <div>{errors.typeAccount}</div> : null}
            </div>

            {initialValue.id ? (
              <div className="d-flex justify-content-between">
                <Button title="Изменить" type={'submit'} className={'btn btn-primary mt-3'} />
                <Button
                  title="Удалить"
                  type={'button'}
                  handler={() => handleDelete(initialValue.id)}
                  className={'btn btn-danger mt-3 ms-3'}
                />
              </div>
            ) : (
              <div>
                <Button title="Добавить" type={'submit'} className={'btn btn-primary mt-3'} />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </ModalWindow>
  );
};

ModalWindowBankAccount.propTypes = {
  setActive: PropTypes.func,
  active: PropTypes.bool,
};

export default ModalWindowBankAccount;
