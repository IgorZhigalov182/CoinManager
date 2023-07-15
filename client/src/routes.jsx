import React from 'react';
import MainPage from './pages/mainPage/MainPage';
import Operations from './pages/operationsPage/Operations';
import Operation from './pages/operationPage/Operation';
import OperationsLayout from './layouts/OperationsLayout';
import NotFound from './pages/notFoundPage/NotFound';
import BankAccounts from './pages/bankAccountPage/BankAccounts';
import Auth from './pages/authPage/Auth';
import UserLayout from './layouts/UserLayout';
import Categories from './pages/categoriesPage.jsx/Categories';
import UserPage from './pages/userPage/UserPage';
import { Navigate } from 'react-router-dom';

const routes = (isLoggedIn) => [
  { path: '/', element: isLoggedIn ? <MainPage /> : <Navigate to="/login" /> },
  {
    path: 'bankAccounts',
    element: isLoggedIn ? <BankAccounts /> : <Navigate to="/login" />,
    errorElement: <NotFound />,
  },
  { path: 'login', element: <Auth /> },
  { path: 'categories', element: isLoggedIn ? <Categories /> : <Navigate to="/login" /> },
  {
    path: 'operations',
    element: isLoggedIn ? <OperationsLayout /> : <Navigate to="/login" />,
    children: [
      { path: '', element: <Operations /> },
      { path: ':operationId', element: <Operation /> },
    ],
  },
  {
    path: 'user/',
    element: isLoggedIn ? <UserLayout /> : <Navigate to="/login" />,
    children: [{ path: ':userId', element: <UserPage /> }],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
