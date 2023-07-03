import React from 'react';
import '../../styles/modal.css';
import PropTypes from 'prop-types';

const ModalWindow = ({ active, setActive, children }) => {
  return (
    <div className={active ? 'modalWindow active' : 'modalWindow'} onClick={() => setActive(false)}>
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
