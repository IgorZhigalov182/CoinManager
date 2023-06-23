import { Field, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import Button from './common/Button';

const initialValue = { email: '', password: '' };

const LoginForm = ({ setIsSingUp }) => {
  const inputEmail = useRef(null);
  // const inputPassword = useRef(null);

  // const enter = document.querySelector('html');
  // enter.addEventListener('keydown', function focusPassword(e) {
  //   if (e.code === 'Enter') {
  //     inputPassword.current.focus();
  //     enter.removeEventListener('keydown', focusPassword);
  //   }
  // });

  const handleRegister = () => {
    console.log('click');
    setIsSingUp(true);
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    inputEmail.current.focus();
  }, []);

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
          // setInitialValue(bankAccountData);
        }}
        // validationSchema={operationSchema}
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
              // innerRef={inputPassword}
              type="password"
              className="form-control w-100 mt-3"
              placeholder="Пароль"
              name="password"
            />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            <div className="d-flex flex-column">
              <Button
                title="Войти"
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
                  Зарегистрироваться
                </a>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
