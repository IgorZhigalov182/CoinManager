import React from 'react';
import PropTypes from 'prop-types';
import './ModalWindow.scss';

const ModalWindow = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? 'modalWindow active' : 'modalWindow'}
      onClick={(e) => {
        setActive(false);
      }}>
      <div
        className={active ? 'modalWindow__content active' : 'modalWindow__content'}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

ModalWindow.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setActive: PropTypes.func,
};

export default ModalWindow;
