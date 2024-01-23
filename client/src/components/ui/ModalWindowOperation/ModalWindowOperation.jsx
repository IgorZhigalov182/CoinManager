import React, { useState, useEffect } from 'react';
import Button from '../common/button/Button';
import PropTypes from 'prop-types';
import '../../../styles/modal.css';
import ModalWindow from '../modalWindow/ModalWindow';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  getCategoryDisplayNameById
} from '../../../store/categories/categories.slice';
import * as Yup from 'yup';
import { getActiveBankAccount } from '../../../store/bankAccounts/bankAccounts.slice';
import { createOperation, updateOperationById } from '../../../store/operations/operations.slice';
import { getRandomColor } from '../../../utils/getRandomColor';
import localStorageService from '../../../services/localStorage.services';
import { toast } from 'react-toastify';
import styles from './ModalWindowOperation.module.scss';

const ModalWindowOperation = ({
  operation,
  typeOperationForModal,
  modalActive,
  setModalActive
}) => {
  const actualBankAccount = useSelector(getActiveBankAccount());
  const dispatch = useDispatch();
  const categoryName = useSelector(getCategoryDisplayNameById(operation?.category));

  if (!categoryName && operation?._id) {
    operation = { ...operation, category: '' };
  }

  const [initialValue, setInitialValue] = useState({
    idBankAccount: '',
    comment: '',
    category: '',
    sum: '',
    addNewCategory: false,
    newCategory: '',
    userId: localStorageService.getUserId(),
    typeOperation: typeOperationForModal || 'expense'
  });

  const findTargetOperation = () => {
    return operation
      ? operation
      : {
          idBankAccount: '',
          comment: '',
          category: '',
          sum: '',
          addNewCategory: false,
          newCategory: '',
          userId: localStorageService.getUserId(),
          typeOperation: typeOperationForModal || 'expense'
        };
  };

  const categories = useSelector(getCategories());
  const userId = localStorageService.getUserId();

  const createCategoryInOperation = async (data) => {
    const response = await dispatch(
      createCategory({
        name: data.newCategory,
        color: getRandomColor(),
        userId: localStorageService.getUserId()
      })
    );

    return response._id;
  };

  const handleUpdate = async (data) => {
    if (data.addNewCategory && data.newCategory) {
      data.category = await createCategoryInOperation(data);
    }

    dispatch(updateOperationById(data));
    setModalActive(false);
  };

  const handleSubmit = async (data) => {
    if (data.addNewCategory && data.newCategory) {
      data.category = await createCategoryInOperation(data);
    }
    data.userId = userId;
    data.date = Date.now();
    actualBankAccount ? (data.idBankAccount = actualBankAccount) : (data.idBankAccount = '');

    dispatch(createOperation(data));
    setModalActive(false);
  };

  const operationSchema = Yup.object().shape({
    sum: Yup.string().required('Обязательное поле')
  });

  const validateNewCategory = (addNewCategory, nameNewCategory) => {
    if (addNewCategory && !nameNewCategory) {
      return 'Обязательное поле';
    }
  };

  const validateCategory = (addNewCategory, input) => {
    if (!addNewCategory && !input) {
      return 'Обязательное поле';
    }
  };

  useEffect(() => {
    setInitialValue(findTargetOperation());
  }, [modalActive]);

  return (
    <div>
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <Formik
          onSubmit={async (values, { resetForm }) => {
            if (values.sum <= 0) {
              return toast('Сумма должна быть положительна и больше нуля');
            }

            handleSubmit(values);
            resetForm();
          }}
          validationSchema={operationSchema}
          initialValues={initialValue}
          enableReinitialize={true}>
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="modalFormWrapper">
              <Field type="number" name="sum" placeholder="Сумма" />
              {errors.sum && touched.sum ? (
                <div className={styles.errorText}>{errors.sum}</div>
              ) : null}
              <div className={styles.categoryWrapper}>
                {!values.addNewCategory && (
                  <Field
                    className={styles.selectCategory}
                    as="select"
                    name="category"
                    validate={() => validateCategory(values.addNewCategory, values.category)}>
                    <option disabled value="">
                      (Выберите категорию)
                    </option>
                    {categories &&
                      categories.map((category) => {
                        return (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        );
                      })}
                  </Field>
                )}
                {values.addNewCategory && (
                  <Field
                    validate={() => validateNewCategory(values.addNewCategory, values.newCategory)}
                    name="newCategory"
                    type="text"
                    className={styles.selectCategory}
                    placeholder="Новая категория"
                  />
                )}
                <Button
                  title={values.addNewCategory ? '☰' : '+'}
                  spanStyle={styles.btnSpanCategory}
                  className={styles.btnNewCategory}
                  handler={() => setFieldValue('addNewCategory', !values.addNewCategory)}
                />
              </div>
              {errors.newCategory && touched.newCategory ? <div>{errors.newCategory}</div> : null}
              {errors.category && touched.category ? <div>{errors.category}</div> : null}
              <div role="group" aria-labelledby="my-radio-group" className={styles.typeOperation}>
                <span className={styles.spanTypeOperation}>Тип операции</span>
                <div className={styles.radioWrapper}>
                  <div className={styles.radioTypeOperation}>
                    <label className={styles.labelTypeOperation}>
                      <Field
                        type="radio"
                        className={styles.radioInput}
                        name="typeOperation"
                        value="expense"
                      />
                      <span className="ms-2">Расходы</span>
                    </label>
                  </div>
                  <div className={styles.radioTypeOperation}>
                    <label className={styles.labelTypeOperation}>
                      <Field
                        type="radio"
                        className={styles.radioInput}
                        name="typeOperation"
                        value="profit"
                      />
                      <span className="ms-2">Доходы</span>
                    </label>
                  </div>
                </div>

                {errors.typeAccount && touched.typeAccount ? <div>{errors.typeAccount}</div> : null}
              </div>
              <div className={styles.textareaWrapper}>
                <Field
                  as="textarea"
                  className={styles.commentField}
                  placeholder="Комментарий"
                  name="comment"
                />
              </div>
              {operation && (
                <Button
                  title="Изменить"
                  type={'button'}
                  className="modalFormBtn"
                  handler={() => handleUpdate(values)}
                />
              )}
              {!operation && <Button title="Добавить" type={'submit'} className="modalFormBtn" />}
            </Form>
          )}
        </Formik>
      </ModalWindow>
    </div>
  );
};

ModalWindowOperation.propTypes = {
  operation: PropTypes.object,
  typeOperationForModal: PropTypes.string,
  modalActive: PropTypes.bool,
  ModalWindowOperation: PropTypes.func
};

export default ModalWindowOperation;
