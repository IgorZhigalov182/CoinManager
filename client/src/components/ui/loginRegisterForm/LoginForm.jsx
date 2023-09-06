import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import Button from '../common/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthErrors, getIsLoggedIn, login } from '../../../store/users/users.slice';
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './loginRegisterForm.module.scss';

const initialValue = { email: '', password: '' };

const LoginForm = ({ setIsSingUp }) => {
  const dispatch = useDispatch();
  const inputEmail = useRef(null);
  const isLoggedIn = useSelector(getIsLoggedIn());
  const authError = useSelector(getAuthErrors());

  const handleRegister = () => setIsSingUp(true);

  const handleSubmit = (values) => {
    const redirect = '/categories';
    dispatch(login({ payload: values, redirect }));
  };

  useEffect(() => {
    inputEmail.current.focus();
  }, []);

  const loginSchema = Yup.object().shape({
    password: Yup.string().required('Обязательное поле'),
    email: Yup.string().required('Обязательное поле'),
  });

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formInner}>
        <Formik
          onSubmit={async (values, actions) => {
            handleSubmit(values);
          }}
          validationSchema={loginSchema}
          initialValues={initialValue}
          enableReinitialize={true}>
          {({ errors, touched, values }) => (
            <Form>
              <Field
                innerRef={inputEmail}
                type="email"
                name="email"
                className={styles.inputText}
                placeholder="Email"
              />
              {errors.email && touched.email ? (
                <div className={styles.inputError}>{errors.email}</div>
              ) : null}
              <Field
                type="password"
                className={styles.inputText}
                placeholder="Пароль"
                name="password"
              />
              {errors.password && touched.password ? (
                <div className={styles.inputError}>{errors.password}</div>
              ) : null}
              {authError === 'Request failed with status code 400' ? (
                <div className={styles.inputError}>Неверный логин или пароль</div>
              ) : (
                ''
              )}
              <Button
                title="Войти"
                type={'submit'}
                spanStyles={styles.spanStyles}
                className={styles.submitButton}
              />
              <a role="button" className={styles.toggleRegister} onClick={handleRegister}>
                Зарегистрироваться
              </a>
            </Form>
          )}
        </Formik>
        {isLoggedIn && <Navigate to="/" />}
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  setIsSingUp: PropTypes.func,
};

export default LoginForm;
