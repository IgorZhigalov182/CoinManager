import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../common/button/Button';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn, signUp } from '../../../store/users/users.slice';
import styles from './loginRegisterForm.module.scss';

const initialValue = { email: '', password: '', confirmPassword: '', firstName: '', lastName: '' };

const RegisterForm = ({ setIsSingUp }) => {
  const inputName = useRef(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  const handleSubmit = (values) => dispatch(signUp(values));

  const handleRegister = () => setIsSingUp(false);

  useEffect(() => {
    inputName.current.focus();
  }, []);

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required('Обязательное поле'),
    lastName: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
    email: Yup.string().required('Обязательное поле'),
  });

  return (
    <div className={styles.formWrapper}>
      <Formik
        onSubmit={async (values, actions) => {
          handleSubmit(values);
        }}
        validationSchema={registerSchema}
        initialValues={initialValue}
        enableReinitialize={true}>
        {({ errors, touched, values }) => (
          <Form className={styles.formLogin}>
            <Field
              innerRef={inputName}
              type="text"
              name="firstName"
              placeholder="Имя"
              className="form-control"
            />
            {errors.firstName && touched.firstName ? (
              <div className={styles.inputError}>{errors.firstName}</div>
            ) : null}
            <Field
              type="text"
              name="lastName"
              placeholder="Фамилия"
              className="form-control mt-3"
            />
            {errors.lastName && touched.lastName ? (
              <div className={styles.inputError}>{errors.lastName}</div>
            ) : null}
            <Field type="email" name="email" className="form-control mt-3" placeholder="Email" />
            {errors.email && touched.email ? (
              <div className={styles.inputError}>{errors.email}</div>
            ) : null}
            <Field
              type="password"
              className="form-control w-100 mt-3"
              placeholder="Пароль"
              name="password"
            />
            {errors.password && touched.password ? (
              <div className={styles.inputError}>{errors.password}</div>
            ) : null}
            <Field
              type="password"
              className="form-control w-100 mt-3"
              placeholder="Повторите пароль"
              name="confirmPassword"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className={styles.inputError}>{errors.confirmPassword}</div>
            ) : null}
            <Button title="Зарегистрироваться" type={'submit'} className={styles.submitButton} />
            <a className={styles.toggleLogin} role="button" onClick={handleRegister}>
              Есть аккаунт
            </a>
          </Form>
        )}
      </Formik>
      {isLoggedIn && <Navigate to="/user/1" />}
    </div>
  );
};

RegisterForm.propTypes = {
  setIsSingUp: PropTypes.func,
};

export default RegisterForm;
