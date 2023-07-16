import React from 'react';
import style from './burger.module.scss';
import PropTypes from 'prop-types';

const Burger = ({ setActiveBurgerMenu }) => {
  return (
    <label className={style.bar} htmlFor="check">
      <input type="checkbox" id="check" onChange={setActiveBurgerMenu} />

      <span className={style.top}></span>
      <span className={style.middle}></span>
      <span className={style.bottom}></span>
    </label>
  );
};

Burger.propTypes = {
  theme: PropTypes.func,
};

export default Burger;
