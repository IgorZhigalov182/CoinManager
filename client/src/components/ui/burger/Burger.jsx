import React from 'react';
import style from './burger.module.scss';
import PropTypes from 'prop-types';

const Burger = ({ setActiveBurgerMenu }) => {
  return (
    <div className={style.burgerWrapper}>
      <label className={style.bar} htmlFor="check">
        <input type="checkbox" id="check" onChange={setActiveBurgerMenu} />

        <span className={style.top}></span>
        <span className={style.middle}></span>
        <span className={style.bottom}></span>
      </label>
    </div>
  );
};

Burger.propTypes = {
  theme: PropTypes.func,
};

export default Burger;
