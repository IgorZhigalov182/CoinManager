import React, { useState } from 'react';
import ModalWindow from './modalWindow/ModalWindow';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Button from './common/button/Button';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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
            <Form className="modalFormWrapper">
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
              <Field as="input" type="file" className="form-control mt-2" name="logo"></Field>
              <Button type={'submit'} className="modalFormBtn" title={'Изменить'} />
            </Form>
          )}
        </Formik>
      </ModalWindow>
    </div>
  );
};

ModalWindowUser.propTypes = {
  modalActive: PropTypes.bool,
  setModalActive: PropTypes.func,
};

export default ModalWindowUser;
