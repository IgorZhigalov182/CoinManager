import React from 'react';
import MainPage from './pages/MainPage';
import NewOperation from './components/ui/NewOperation';
import Login from './Login';
import Operations from './pages/Operations';
import Operation from './pages/Operation';
import OperationsLayout from './layouts/OperationsLayout';
import NotFound from './pages/NotFound';
import BankAccounts from './pages/BankAccounts';

const routes = [
  { path: '/', element: <MainPage />, errorElement: <NotFound /> },
  { path: 'favorites', element: <BankAccounts />, errorElement: <NotFound /> },
  { path: 'login', element: <Login /> },
  {
    path: 'operations',
    element: <OperationsLayout />,
    children: [
      { path: '', element: <Operations /> },
      { path: ':operationId', element: <Operation /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
