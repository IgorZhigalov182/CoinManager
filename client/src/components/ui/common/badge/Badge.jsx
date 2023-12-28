import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ title, className, backgroundColor, color }) => {
  const badgeStyle = {
    color: color,
    backgroundColor: backgroundColor
  };

  return <span className={className}>{title}</span>;
};

export default Badge;

Badge.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string
};
