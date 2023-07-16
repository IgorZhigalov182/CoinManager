import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/js/src/collapse.js';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../../store/users/users.slice';
import { getUserId } from '../../../services/localStorage.services';
import style from './navBar.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';

function NavBar() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const userId = getUserId();

  return (
    // <nav className="navbar navbar-dark bg-primary navbar-expand-md">
    <header className={style.header}>
      <div className={''}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/584/584052.png"
          alt="logo"
          className={style.logo}
        />
      </div>
      <nav className={style.nav}>
        <ul className={style.navbar_ul}>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Главная
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link">
                  Категории
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/bankAccounts" className="nav-link">
                  Счета
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/operations" className="nav-link">
                  Операции
                </NavLink>
              </li>
              {/* <div className={style.logo_switch}> */}
              <li className="nav-item">
                <ThemeSwitcher />
              </li>
              <li className="nav-item">
                <NavLink to={`/user/${userId}`} className="nav-link">
                  <i className="fa-solid fa-user"></i>
                </NavLink>
              </li>
              {/* </div> */}
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
    </header>
  );
}

NavBar.propTypes = {
  theme: PropTypes.object,
};

export default NavBar;
