import React from 'react';
import PropTypes from 'prop-types';
import style from './button.module.scss';
import classNames from 'classnames';

const Button = ({ title, className, handler, type }) => {
  const buttonStyle = classNames(style[className]);

  return (
    // <button
    //   type={type}
    //   // className={className || 'btn btn-primary'}
    //   className={buttonStyle}
    //   onClick={handler}
    //   style={style}>
    //   {title}
    // </button>

    <button onClick={handler} style={style}>
      <span className="text">{title}</span>
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
