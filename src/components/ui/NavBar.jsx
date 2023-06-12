import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-2">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Главная
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/favorites" className="nav-link">
                Счета
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/newOperation" className="nav-link">
                Новая операция
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/operations" className="nav-link">
                Операции
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Auth/SignUp
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
