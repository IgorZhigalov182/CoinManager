import React, { useState } from 'react';
import LoginForm from '../components/ui/LoginForm';
import RegisterForm from '../components/ui/RegisterForm';
import LineChart from '../components/ui/LineChart';
import { getRandomColor } from '../utils/getRandomColor';

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
