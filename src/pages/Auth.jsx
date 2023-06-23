import React, { useState } from 'react';
import LoginForm from '../components/ui/LoginForm';
import RegisterForm from '../components/ui/RegisterForm';

const Auth = () => {
  const [isSingUp, setIsSingUp] = useState(false);

  return (
    <div className="">
      {!isSingUp && <LoginForm setIsSingUp={setIsSingUp} />}
      {isSingUp && <RegisterForm setIsSingUp={setIsSingUp} />}

      {/* <span className="container mt-2 ms-auto">
        <a
          className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          role="button"
          //   style={{ userSelect: 'none', marginTop: '1rem' }}
        >
          Зарегистрироваться
        </a>
      </span> */}
    </div>
  );
};

export default Auth;
