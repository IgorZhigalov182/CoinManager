import React from 'react';

const Badge = ({ title, className, style, backgroundColor, color }) => {
  const badgeStyle = {
    color: color,
    backgroundColor: backgroundColor,
  };

  return (
    <span className={className} style={badgeStyle}>
      {title}
    </span>
  );
};

export default Badge;
