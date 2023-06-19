import React from 'react';

const Badge = ({ title, className, style }) => {
  return (
    <span className={className} style={style}>
      {title}Р
    </span>
  );
};

export default Badge;
