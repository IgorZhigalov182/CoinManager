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
import { Navigate, Route } from 'react-router-dom';

const routes = (isLoggedIn, location) => [
  { path: '/', element: <MainPage />, errorElement: <NotFound /> },
  { path: 'bankAccounts', element: <BankAccounts />, errorElement: <NotFound /> },
  { path: 'login', element: <Auth /> },
  { path: 'categories', element: <Categories /> },
  {
    path: 'operations',
    element: <OperationsLayout />,
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
// export default routes;
