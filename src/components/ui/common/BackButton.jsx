import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return <Button className={'btn btn-secondary'} title={'Назад'} handler={handleBack} />;
};

export default BackButton;
