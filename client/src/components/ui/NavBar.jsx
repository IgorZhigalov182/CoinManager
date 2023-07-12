import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/js/src/collapse.js';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../store/users/users.slice';
import { getUserId } from '../../services/localStorage.services';

export default function NavBar() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const userId = getUserId();

  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-md">
      <ul className="navbar-nav">
        <li className="nav-item me-auto">
          {!isLoggedIn ? (
            <NavLink to="/login" className="nav-link navbar ms-2">
              Авторизация
              <i className="fa-solid fa-right-to-bracket ms-2"></i>
            </NavLink>
          ) : (
            <NavLink to={`/user/${userId}`} className="nav-link navbar ms-3">
              <i className="fa-solid fa-user"></i>
            </NavLink>
          )}
        </li>
      </ul>
      <button
        className="navbar-toggler me-2"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
        type="button"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon "></span>
      </button>
      <div className="navbar-collapse collapse ms-2" id="navbar">
        {isLoggedIn && (
          <ul className="navbar-nav">
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
          </ul>
        )}
      </div>
    </nav>
  );
}
