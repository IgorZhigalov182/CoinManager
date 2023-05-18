import React from 'react';
import MainPage from './pages/MainPage';
import NewOperation from './layouts/NewOperation';
import Login from './Login';
import Widget from './layouts/Widget';
import Operations from './pages/Operations';
import Operation from './pages/Operation';
import OperationsLayout from './layouts/OperationsLayout';
import { Navigate } from 'react-router-dom';

const routes = [
  { path: '/', element: <MainPage />, errorElement: <Operation /> },
  { path: 'favorites', element: <Widget />, errorElement: <Operation /> },
  { path: 'newOperation', element: <NewOperation /> },
  { path: 'login', element: <Login /> },
  {
    path: 'operations',
    element: <OperationsLayout />,
    children: [
      { path: '', element: <Operations /> },
      { path: 'operation', element: <Operation /> },
      { path: '*', element: <Navigate to="/operations" /> },
    ],
  },
];

export default routes;
