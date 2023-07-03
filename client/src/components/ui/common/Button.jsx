import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ title, className, style, handler, type }) => {
  return (
    <button type={type} className={className || 'btn btn-primary'} onClick={handler} style={style}>
      {title}
    </button>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  handler: PropTypes.func,
};
