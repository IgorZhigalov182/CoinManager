import React, { useEffect, useState } from 'react';
import ModalWindow from '../modalWindow/ModalWindow';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from '../common/button/Button';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createCategory, updateCategoryById } from '../../../store/categories/categories.slice';
import localStorageService from '../../../services/localStorage.services';
import styles from './ModalWindowCategory.module.scss';

const ModalWindowCategory = ({ categories, selectedCategory, modalActive, setModalActive }) => {
  const dispatch = useDispatch();

  let category = categories?.filter((category) => category._id === selectedCategory)[0];

  const [initialValue, setInitialValue] = useState({
    color: '#000000',
    userId: '',
    name: ''
  });

  const findTargetCategory = () => {
    return category
      ? category
      : {
          color: '#000000',
          userId: '',
          name: ''
        };
  };

  useEffect(() => {
    setInitialValue(findTargetCategory());
  }, [modalActive]);

  const categorySchema = Yup.object().shape({
    name: Yup.string().required('Обязательное поле')
  });

  const handleSubmit = async (data) => {
    if (data._id) {
      dispatch(updateCategoryById(data));
    } else {
      data.userId = localStorageService.getUserId();
      dispatch(createCategory(data));
    }
    setModalActive(!modalActive);
  };

  return (
    <div className="">
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <Formik
          onSubmit={async (values, actions) => {
            handleSubmit(values);
          }}
          validationSchema={categorySchema}
          initialValues={initialValue}
          enableReinitialize={true}>
          {({ errors, touched, handleChange, values }) => (
            <Form className="modalFormWrapper">
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Наименование"></Field>
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
              <Field
                type="color"
                name="color"
                className="form-control form-control-color mt-2"></Field>
              <Button
                type={'submit'}
                className="modalFormBtn"
                title={!values?._id ? 'Добавить' : 'Изменить'}
              />
            </Form>
          )}
        </Formik>
      </ModalWindow>
    </div>
  );
};

ModalWindowCategory.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  selectedCategory: PropTypes.string,
  modalActive: PropTypes.bool,
  setModalActive: PropTypes.func
};

export default ModalWindowCategory;
