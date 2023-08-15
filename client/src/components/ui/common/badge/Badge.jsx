import React from 'react';
import PropTypes from 'prop-types';
import styles from './badge.scss';

const Badge = ({ title, className, backgroundColor, color }) => {
  const badgeStyle = {
    color: color,
    backgroundColor: backgroundColor,
  };

  return <span style={badgeStyle}>{title}</span>;
};

export default Badge;

Badge.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
};
