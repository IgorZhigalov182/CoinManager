import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../../store/users/users.slice';
import { getUserId } from '../../../services/localStorage.services';
import style from './navBar.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';
import Burger from '../burger/Burger';
import BurgerMenu from '../burgerMenu/BurgerMenu';

function NavBar() {
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedIn());
  const userId = getUserId();
  const toggleBurger = () => setActiveBurgerMenu(!activeBurgerMenu);
  const burgerActive = classNames(activeBurgerMenu ? style.nav_active : style.nav);

  return (
    <header className={style.header}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/584/584052.png"
        alt="logo"
        className={style.logo}
      />
      <nav className={burgerActive}>
        <ul className={style.navbar_ul}>
          {isLoggedIn ? (
            <>
              <li className={style.nav_item}>
                <NavLink to="/" className="nav-link">
                  Главная
                </NavLink>
              </li>
              <li className={style.nav_item}>
                <NavLink to="/categories" className="nav-link">
                  Категории
                </NavLink>
              </li>
              <li className={style.nav_item}>
                <NavLink to="/bankAccounts" className="nav-link">
                  Счета
                </NavLink>
              </li>
              <li className={style.nav_item}>
                <NavLink to="/operations" className="nav-link">
                  Операции
                </NavLink>
              </li>
              <li className={style.nav_item}>
                <ThemeSwitcher />
              </li>
              <li className={style.nav_item}>
                <NavLink to={`/user/${userId}`} className="nav-link">
                  <i className="fa-solid fa-user"></i>
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className="nav-link navbar ms-2">
                Авторизация
                <i className="fa-solid fa-right-to-bracket ms-2"></i>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className={style.burger}>
        <BurgerMenu activeBurgerMenu={activeBurgerMenu} setActiveBurgerMenu={toggleBurger} />
      </div>
    </header>
  );
}

NavBar.propTypes = {
  theme: PropTypes.object,
};

export default NavBar;
