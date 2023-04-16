import React from 'react';

const Button = ({ title, className, style, onClick }) => {
  return (
    <button className={className || 'btn btn-primary'} onClick={onClick} style={style}>
      {title}
    </button>
  );
};

export default Button;
