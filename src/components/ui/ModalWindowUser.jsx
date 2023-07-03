import React, { useEffect, useState } from 'react';
import ModalWindow from './ModalWindow';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from './common/Button';
import { getRandomColor } from '../../utils/getRandomColor';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, updateCategoryById } from '../../store/categories/categories.slice';
import localStorageService from '../../services/localStorage.services';
import { getUser, updateUserData } from '../../store/users/users.slice';

const ModalWindowUser = ({ modalActive, setModalActive }) => {
  const userData = useSelector(getUser())[0];
  const [initialValue, setInitialValue] = useState({ ...userData });
  const dispatch = useDispatch();

  const userSchema = Yup.object().shape({
    firstName: Yup.string().required('Обязательное поле'),
    lastName: Yup.string().required('Обязательное поле'),
  });

  const handleSubmit = async (data) => {
    dispatch(updateUserData(data));
    setModalActive(!modalActive);
  };

  return (
    <div className="">
      <ModalWindow active={modalActive} setActive={setModalActive}>
        <Formik
          onSubmit={async (values, actions) => {
            handleSubmit(values);
          }}
          validationSchema={userSchema}
          initialValues={initialValue}
          enableReinitialize={true}>
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <Field
                type="text"
                name="firstName"
                className="form-control"
                placeholder="Имя"></Field>
              {errors.firstName && touched.firstName ? <div>{errors.firstName}</div> : null}
              <Field
                type="text"
                name="lastName"
                className="form-control mt-2"
                placeholder="Фамилия"></Field>
              {errors.lastName && touched.lastName ? <div>{errors.lastName}</div> : null}
              <Button type={'submit'} className={'btn btn-success mt-2'} title={'Изменить'} />
            </Form>
          )}
        </Formik>
      </ModalWindow>
    </div>
  );
};

export default ModalWindowUser;
