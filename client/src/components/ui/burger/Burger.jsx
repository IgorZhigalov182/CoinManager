import React, { useContext, useRef } from 'react';
import style from './burger.module.scss';
import PropTypes from 'prop-types';
import { Context } from '../../../context/context';

const Burger = ({ activeBurgerMenu, setActiveBurgerMenu }) => {
  const { handleGoPage } = useContext(Context);
  const toggleInput = () => handleGoPage();

  return (
    <div className={style.burgerWrapper}>
      <label className={style.bar} htmlFor="check">
        <input type="checkbox" id="check" onChange={toggleInput} />
        <span className={style.top}></span>
        <span className={style.middle}></span>
        <span className={style.bottom}></span>
      </label>
    </div>
  );
};

Burger.propTypes = {
  setActiveBurgerMenu: PropTypes.func,
  activeBurgerMenu: PropTypes.bool
};

export default Burger;
