import React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Button from '../common/button/Button';
import {
  createBankAccount,
  deleteBankAccountById,
  getBankAccountList,
  updatedBankAccountById
} from '../../../store/bankAccounts/bankAccounts.slice';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from '../modalWindow/ModalWindow';
import styles from './ModalWindowBankAccount.module.scss';

const ModalWindowBankAccount = ({ initialValue, setInitialValue, active, setActive }) => {
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
      //   data.date = Date.now();
      dispatch(createBankAccount(data, bankAccounts));
      setInitialValue({
        name: '',
        bank: '',
        active: false,
        typeAccount: ''
      });
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
    typeAccount: Yup.string().required('Обязательное поле')
  });

  return (
    <ModalWindow active={active} setActive={setActive}>
      <Formik
        validationSchema={bankAccountSchema}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        enableReinitialize={true}
        initialValues={initialValue}>
        {({ errors, touched, values }) => (
          <Form className="modalFormWrapper">
            <Field type="text" name="name" className="form-control" placeholder="Название счёта" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <Field type="text" name="bank" className="form-control mt-2" placeholder="Банк" />
            {errors.bank && touched.bank ? <div>{errors.bank}</div> : null}
            <label className={styles.labelActive}>
              Основной счёт
              <Field type="checkbox" name="active" className={styles.checkboxActive} />
            </label>
            <div role="group" aria-labelledby="my-radio-group" className={styles.radioGroup}>
              <label>Тип счёта:</label>
              <label className={styles.radioWrapper}>
                <Field
                  type="radio"
                  className={styles.radioInput}
                  name="typeAccount"
                  value="current"
                />
                <span className={styles.radioSpan}>Текущий</span>
              </label>
              <label className={styles.radioWrapper}>
                <Field
                  type="radio"
                  className={styles.radioInput}
                  name="typeAccount"
                  value="credit"
                />
                <span className={styles.radioSpan}>Кредитный</span>
              </label>
              <label className={styles.radioWrapper}>
                <Field
                  type="radio"
                  className={styles.radioInput}
                  name="typeAccount"
                  value="estimated"
                />
                <span className={styles.radioSpan}>Расчётный (для ИП)</span>
              </label>
              {errors.typeAccount && touched.typeAccount ? <div>{errors.typeAccount}</div> : null}
            </div>

            {initialValue._id ? (
              <div className={styles.buttonWrapper}>
                <Button
                  title="Изменить"
                  type={'submit'}
                  className={styles.btnChange}
                  // spanStyle={styles.btnSpanChange}
                />
                <Button
                  title={<i className="fa-solid fa-trash"></i>}
                  type={'button'}
                  handler={() => handleDelete(initialValue._id)}
                  className={styles.btnRemove}
                  spanStyle={styles.btnSpanRemove}
                />
              </div>
            ) : (
              <Button title="Добавить" type={'submit'} className="modalFormBtn" />
            )}
          </Form>
        )}
      </Formik>
    </ModalWindow>
  );
};

ModalWindowBankAccount.propTypes = {
  setActive: PropTypes.func,
  active: PropTypes.bool
};

export default ModalWindowBankAccount;
