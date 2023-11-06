import React from 'react';
import PropTypes from 'prop-types';
import style from './button.module.scss';
import classNames from 'classnames';

const Button = ({ title, className, handler, spanStyle }) => {
  const buttonStyle = classNames(style.btn, className);
  const spanStyles = classNames(spanStyle, style.span);

  return (
    <button className={buttonStyle} onClick={handler}>
      <span className={spanStyles}>{title}</span>
    </button>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  spanStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  type: PropTypes.string,
  handler: PropTypes.func,
};
