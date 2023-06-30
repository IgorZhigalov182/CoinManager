import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import Button from './common/Button';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn, signUp } from '../../store/users/users.slice';

const initialValue = { email: '', password: '', confirmPassword: '', firstName: '', lastName: '' };

const RegisterForm = ({ setIsSingUp }) => {
  const inputName = useRef(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(signUp(values));
  };

  const handleRegister = () => {
    setIsSingUp(false);
  };

  useEffect(() => {
    inputName.current.focus();
  }, []);

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required('Обязательное поле'),
    lastName: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
    // category: Yup.string().required('Обязательное поле'),
    // email: Yup.string().email('Неверный email').required('Обязательное поле'),
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
        className=""
        onSubmit={async (values, actions) => {
          handleSubmit(values);
          // setInitialValue(bankAccountData);
        }}
        validationSchema={registerSchema}
        initialValues={initialValue}
        enableReinitialize={true}>
        {({ errors, touched, values }) => (
          <Form>
            <Field
              innerRef={inputName}
              type="text"
              name="firstName"
              placeholder="Имя"
              className="form-control"
            />
            {errors.firstName && touched.firstName ? <div>{errors.firstName}</div> : null}
            <Field
              type="text"
              name="lastName"
              placeholder="Фамилия"
              className="form-control mt-3"
            />
            {errors.lastName && touched.lastName ? <div>{errors.lastName}</div> : null}
            <Field type="email" name="email" className="form-control mt-3" placeholder="Email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field
              // innerRef={inputPassword}
              type="password"
              className="form-control w-100 mt-3"
              placeholder="Пароль"
              name="password"
            />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            <Field
              // innerRef={inputPassword}
              type="password"
              className="form-control w-100 mt-3"
              placeholder="Повторите пароль"
              name="confirmPassword"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
            <div className="d-flex flex-column">
              <Button
                title="Зарегистрироваться"
                type={'submit'}
                className={'btn btn-primary w-100 mt-3'}
                // onSubmit={handleSubmit}
              />
              <span className="mt-2 ms-auto">
                <a
                  className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  role="button"
                  style={{ userSelect: 'none', marginTop: '1rem' }}
                  onClick={handleRegister}>
                  Есть аккаунт
                </a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
      {isLoggedIn && <Navigate to="/user/1" />}
    </div>
  );
};

export default RegisterForm;
