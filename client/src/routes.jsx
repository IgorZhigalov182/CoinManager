import React from 'react';
import MainPage from './pages/MainPage';
import Operations from './pages/Operations';
import Operation from './pages/Operation';
import OperationsLayout from './layouts/OperationsLayout';
import NotFound from './pages/NotFound';
import BankAccounts from './pages/BankAccounts';
import Auth from './pages/Auth';
import UserLayout from './layouts/UserLayout';
import UserPage from './pages/UserPage';
import Categories from './pages/Categories';
import { Navigate } from 'react-router-dom';

const routes = (isLoggedIn, location) => [
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
