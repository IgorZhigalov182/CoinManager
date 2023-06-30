import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/js/src/collapse.js';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../store/users/users.slice';

export default function NavBar() {
  const isAuth = false;
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    // <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-2">
    //   <div className="container-fluid">
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarContent"
    //       aria-controls="navbarContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <NavLink to="/" className="nav-link">
    //             Главная
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink to="/favorites" className="nav-link">
    //             Счета
    //           </NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink to="/operations" className="nav-link">
    //             Операции
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="d-flex">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <NavLink to="/login" className="nav-link">
    //             Auth/SignUp
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>

    //

    <nav className="navbar navbar-dark bg-primary navbar-expand-md">
      <ul className="navbar-nav">
        <li className="nav-item me-auto">
          {!isLoggedIn ? (
            <NavLink to="/login" className="nav-link navbar ms-2">
              Авторизация
              <i className="fa-solid fa-right-to-bracket ms-2"></i>
            </NavLink>
          ) : (
            <NavLink to="/user/1" className="nav-link navbar ms-3">
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
            <li className="nav-item">
              <NavLink to="/user/1" className="nav-link">
                Мой профиль
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
