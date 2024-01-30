import React, { useState } from 'react';
import LoginForm from '../../components/ui/loginRegisterForm/LoginForm';
import RegisterForm from '../../components/ui/loginRegisterForm/RegisterForm';
import { useTheme } from '../../hooks/useTheme';

const Auth = () => {
  const [isSingUp, setIsSingUp] = useState(false);
  useTheme();

  return (
    <>
      {isSingUp ? (
        <RegisterForm setIsSingUp={setIsSingUp} />
      ) : (
        <LoginForm setIsSingUp={setIsSingUp} />
      )}
    </>
  );
};

export default Auth;
