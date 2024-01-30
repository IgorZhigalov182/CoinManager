import React from 'react';
import MainPage from './pages/main/MainPage';
import Operations from './pages/operations/Operations';
import Operation from './pages/operation/Operation';
import OperationsLayout from './layouts/OperationsLayout';
import NotFound from './pages/notFound/NotFound';
import BankAccounts from './pages/bankAccount/BankAccounts';
import Auth from './pages/auth/Auth';
import UserLayout from './layouts/UserLayout';
import Categories from './pages/categories/Categories';
import UserPage from './pages/user/UserPage';
import { Navigate } from 'react-router-dom';

const routes = (isLoggedIn) => [
  { path: '/', element: isLoggedIn ? <MainPage /> : <Navigate to="/login" /> },
  {
    path: 'bankAccounts',
    element: isLoggedIn ? <BankAccounts /> : <Navigate to="/login" />,
    errorElement: <NotFound />
  },
  { path: 'login', element: <Auth /> },
  { path: 'categories', element: isLoggedIn ? <Categories /> : <Navigate to="/login" /> },
  {
    path: 'operations',
    element: isLoggedIn ? <OperationsLayout /> : <Navigate to="/login" />,
    children: [
      { path: '', element: <Operations /> },
      { path: ':operationId', element: <Operation /> }
    ]
  },
  {
    path: 'user/',
    element: isLoggedIn ? <UserLayout /> : <Navigate to="/login" />,
    children: [{ path: ':userId', element: <UserPage /> }]
  },
  { path: '*', element: <NotFound /> }
];

export default routes;
