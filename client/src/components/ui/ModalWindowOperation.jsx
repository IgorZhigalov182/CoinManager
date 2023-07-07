import React, { useState, useRef, useEffect } from 'react';
import Button from './common/Button';
import PropTypes from 'prop-types';
import '../../styles/modal.css';
import ModalWindow from './ModalWindow';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCategory,
  getCategories,
  getCategoryDisplayNameById,
} from '../../store/categories/categories.slice';
import * as Yup from 'yup';
import { getActiveBankAccount } from '../../store/bankAccounts/bankAccounts.slice';
import { createOperation, updateOperationById } from '../../store/operations/operations.slice';
import { getRandomColor } from '../../utils/getRandomColor';
import localStorageService from '../../services/localStorage.services';

const ModalWindowOperation = ({
  operation,
  typeOperationForModal,
  modalActive,
  setModalActive,
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
    typeOperation: typeOperationForModal || 'expense',
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
          typeOperation: typeOperationForModal || 'expense',
        };
  };

  const categories = useSelector(getCategories());
  const userId = localStorageService.getUserId();

  const handleUpdate = (data) => {
    dispatch(updateOperationById(data));
    setModalActive(false);
  };

  const handleSubmit = async (data) => {
    if (data.addNewCategory && data.newCategory) {
      const categoryData = {
        name: data.newCategory,
        color: getRandomColor(),
        userId: localStorageService.getUserId(),
      };
      const response = await dispatch(createCategory(categoryData));
      data.category = response._id;
    }
    data.userId = userId;
    data.date = Date.now();
    actualBankAccount ? (data.idBankAccount = actualBankAccount) : (data.idBankAccount = '');

    dispatch(createOperation(data));
    setModalActive(false);
  };

  const operationSchema = Yup.object().shape({
    sum: Yup.string().required('Обязательное поле'),
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
            handleSubmit(values);
            resetForm();
          }}
          validationSchema={operationSchema}
          initialValues={initialValue}
          enableReinitialize={true}>
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <Field type="number" name="sum" className="form-control" placeholder="Сумма" />
              {errors.sum && touched.sum ? <div>{errors.sum}</div> : null}
              {!values.addNewCategory && (
                <Field
                  className="form-select mb-2 mt-2"
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
              {errors.newCategory && touched.newCategory ? <div>{errors.newCategory}</div> : null}
              {errors.category && touched.category ? <div>{errors.category}</div> : null}
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
                  validate={() => validateNewCategory(values.addNewCategory, values.newCategory)}
                  name="newCategory"
                  type="text"
                  className="form-control mb-3"
                  placeholder="Новая категория"></Field>
              )}
              <div>Тип операции</div>
              <div role="group" aria-labelledby="my-radio-group" className="mt-1">
                <div>
                  <Field
                    type="radio"
                    className="form-check-input"
                    name="typeOperation"
                    value="expense"
                  />
                  <span className="ms-2">Расходы</span>
                </div>
                <div>
                  <Field
                    type="radio"
                    className="form-check-input"
                    name="typeOperation"
                    value="profit"
                  />
                  <span className="ms-2">Доходы</span>
                </div>

                {errors.typeAccount && touched.typeAccount ? <div>{errors.typeAccount}</div> : null}
              </div>

              <Field
                as="textarea"
                className="form-control mt-3"
                placeholder="Комментарий"
                name="comment"
              />
              <div>
                {operation && (
                  <Button
                    title="Изменить"
                    type={'button'}
                    className={'btn btn-success mt-3'}
                    handler={() => handleUpdate(values)}
                  />
                )}
                {!operation && (
                  <Button title="Добавить" type={'submit'} className={'btn btn-primary mt-3'} />
                )}
              </div>
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
  ModalWindowOperation: PropTypes.func,
};

export default ModalWindowOperation;
