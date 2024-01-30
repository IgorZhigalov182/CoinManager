import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../../store/users/users.slice';
import { getUserId } from '../../../services/localStorage.services';
import style from './navBar.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';
import BurgerMenu from '../burgerMenu/BurgerMenu';
import { Context } from '../../../context/context';

function NavBar() {
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedIn());
  const userId = getUserId();
  const burgerActive = classNames(activeBurgerMenu ? style.nav_active : style.nav);
  const navigate = useNavigate();

  const handleGoPage = (e) => {
    if (e) {
      const burgerMenu = document.querySelector('#check');
      burgerMenu.checked = !burgerMenu.checked;
    }
    setActiveBurgerMenu(!activeBurgerMenu);
  };

  if (activeBurgerMenu && document.documentElement.clientWidth < 576) {
    document.querySelector('body').style.overflow = 'hidden';
  } else {
    document.querySelector('body').style.overflow = '';
  }

  if (!isLoggedIn) {
    return;
  }

  return (
    <Context.Provider value={{ handleGoPage }}>
      <header className={style.header}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/584/584052.png"
          alt="logo"
          className={style.logo}
          onClick={() => navigate('/')}
        />
        <nav className={burgerActive}>
          <ul className={style.navbar_ul}>
            <li className={style.nav_item}>
              <NavLink to="/" className="nav-link" onClick={handleGoPage}>
                Главная
              </NavLink>
            </li>
            <li className={style.nav_item}>
              <NavLink to="/categories" className="nav-link" onClick={handleGoPage}>
                Категории
              </NavLink>
            </li>
            <li className={style.nav_item}>
              <NavLink to="/bankAccounts" className="nav-link" onClick={handleGoPage}>
                Счета
              </NavLink>
            </li>
            <li className={style.nav_item}>
              <NavLink to="/operations" className="nav-link" onClick={handleGoPage}>
                Операции
              </NavLink>
            </li>
            <li className={style.nav_item}>
              <ThemeSwitcher />
            </li>
            <li className={style.nav_item}>
              <NavLink to={`/user/${userId}`} className="nav-link" onClick={handleGoPage}>
                <i className="fa-solid fa-user"></i>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={style.burger}>
          <BurgerMenu
            setActiveBurgerMenu={setActiveBurgerMenu}
            activeBurgerMenu={activeBurgerMenu}
          />
        </div>
      </header>
    </Context.Provider>
  );
}

NavBar.propTypes = {
  theme: PropTypes.object
};

export default NavBar;
