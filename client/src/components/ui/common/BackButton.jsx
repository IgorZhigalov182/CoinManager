import React from 'react';
import PropTypes from 'prop-types';
import Button from './button/Button';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className }) => {
  const navigate = useNavigate();

  return (
    <Button
      className={className || 'btn btn-secondary'}
      title={'Назад'}
      handler={() => navigate(-1)}
    />
  );
};

export default BackButton;

BackButton.propTypes = {
  className: PropTypes.string,
};
