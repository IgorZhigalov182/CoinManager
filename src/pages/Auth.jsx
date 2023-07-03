import React, { useState } from 'react';
import LoginForm from '../components/ui/LoginForm';
import RegisterForm from '../components/ui/RegisterForm';

const Auth = () => {
  const [isSingUp, setIsSingUp] = useState(false);

  return (
    <div className="">
      {isSingUp ? (
        <RegisterForm setIsSingUp={setIsSingUp} />
      ) : (
        <LoginForm setIsSingUp={setIsSingUp} />
      )}
    </div>
  );
};

export default Auth;
