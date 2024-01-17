import React from 'react';
import PropTypes from 'prop-types';
import Button from './button/Button';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className, handler }) => {
  const navigate = useNavigate();

  return (
    <Button
      className={className || 'btn btn-secondary'}
      title={<i class="fa-solid fa-reply"></i>}
      handler={() => navigate(-1)}
    />
  );
};

export default BackButton;

BackButton.propTypes = {
  className: PropTypes.string
};
