import React from 'react';

const Button = ({ title, className, style, handler }) => {
  return (
    <button className={className || 'btn btn-primary'} onClick={handler} style={style}>
      {title}
    </button>
  );
};

export default Button;
