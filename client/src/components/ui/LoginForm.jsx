import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import Button from './common/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthErrors, getIsLoggedIn, login } from '../../store/users/users.slice';
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    <div
      style={{
        height: '90%',
        position: 'absolute',
        alignItems: 'center',
      }}
      className="container-fluid d-flex justify-content-center align-middle">
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
              className="form-control"
              placeholder="Email"
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field
              type="password"
              className="form-control w-100 mt-3"
              placeholder="Пароль"
              name="password"
            />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            {authError === 'Request failed with status code 400' ? (
              <div>Неверный логин или пароль</div>
            ) : (
              ''
            )}
            <div className="d-flex flex-column">
              <Button title="Войти" type={'submit'} className={'btn btn-primary w-100 mt-3'} />
              <span className="mt-2 ms-auto">
                <a
                  className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  role="button"
                  style={{ userSelect: 'none', marginTop: '1rem' }}
                  onClick={handleRegister}>
                  Зарегистрироваться
                </a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
      {isLoggedIn && <Navigate to="/" />}
    </div>
  );
};

LoginForm.propTypes = {
  setIsSingUp: PropTypes.func,
};

export default LoginForm;
