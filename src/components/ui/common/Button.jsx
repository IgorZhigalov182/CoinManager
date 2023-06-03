import React from 'react';

const Button = ({ title, className, style, handler, type }) => {
  return (
    <button type={type} className={className || 'btn btn-primary'} onClick={handler} style={style}>
      {title}
    </button>
  );
};

export default Button;
