import React, { useState, useContext } from 'react';
import Button from './common/Button';
import { nanoid } from '@reduxjs/toolkit';
import '../../styles/modal.css';
import ModalWindow from './ModalWindow';
import { addOperation } from '../../services/operations.services';
import { Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { getCategories } from '../../store/categories/categories.slice';
import * as Yup from 'yup';
import { getActiveBankAccount } from '../../store/bankAccounts/bankAccounts.slice';

const NewOperation = ({}) => {
  const actualBankAccount = useSelector(getActiveBankAccount());
  // const formik = useFormik();

  let operationData = {
    idBankAccount: '',
    comment: '',
    category: '',
    sum: '',
    addNewCategory: false,
    newCategory: '',
  };

  const [initialValue, setInitialValue] = useState(operationData);

  // console.log(initialValue);
  // console.log(actualBankAccount);
  // const [data, setData] = useState({
  //   idBankAccount: '12345',
  //   sum: '',
  //   category: '',
  //   comment: '',
  //   id: '',
  // });

  const [modalActive, setModalActive] = useState(false);
  const [operations, setOperations] = useState([]);

  const categories = useSelector(getCategories());

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (data) => {
    data.id = nanoid();
    data.date = Date.now();
    data.idBankAccount = actualBankAccount;
    console.log(data);
    // await addOperation(data);
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

  const operationSchema = Yup.object().shape({
    sum: Yup.string().required('Обязательное поле'),
    category: Yup.string().required('Обязательное поле'),
    // email: Yup.string().email('Неверный email').required('Обязательное поле'),
  });

  const handleModal = () => {
    setModalActive(!modalActive);
  };

  // const handleCheckboxChange = (event) => {
  //   const { checked } = event.target;
  //   formik.setFieldValue('showInput', checked);
  // };

  return (
    <div>
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <Formik
          onSubmit={async (values, actions) => {
            // alert(JSON.stringify(values, null, 2));
            handleSubmit(values);
            // setInitialValue(bankAccountData);
          }}
          validationSchema={operationSchema}
          initialValues={initialValue}
          enableReinitialize={true}>
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <Field type="number" name="sum" className="form-control" placeholder="Сумма" />
              {errors.sum && touched.sum ? <div>{errors.sum}</div> : null}
              <span className="ms-1">Категория</span>
              <Field className="form-select form-select-lg mb-2 mt-2" as="select" name="category">
                {categories &&
                  categories.map((category) => {
                    return (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    );
                  })}
              </Field>

              <label className="ms-1 mb-2">
                Добавить новую категорию
                <Field
                  type="checkbox"
                  name="addNewCategory"
                  checked={values.addNewCategory}
                  onChange={handleChange}
                  className="form-check-input ms-2"
                />
              </label>
              {values.addNewCategory && (
                <Field
                  name="newCategory"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Новая категория">
                  {/* {({ field }) => (
                    <div>
                      <label htmlFor="newCategory">Input field:</label>
                      <input id="newCategory" {...field} />
                    </div>
                  )} */}
                </Field>
              )}
              <Field
                as="textarea"
                className="form-control"
                placeholder="Комментарий"
                name="comment"
              />
              <div>
                <Button title="Добавить" type={'submit'} className={'btn btn-primary mt-3'} />
              </div>
            </Form>
          )}
        </Formik>
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
