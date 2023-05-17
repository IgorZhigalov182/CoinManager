import React from 'react';
import MainPage from './pages/MainPage';
import NewOperation from './layouts/NewOperation';
import Login from './Login';
import Widget from './layouts/Widget';
import Operations from './pages/Operations';
import Operation from './pages/Operation';

const routes = [
  { path: '/favorites', element: <Widget /> },
  { path: '/main', element: <MainPage /> },
  { path: '/newOperation', element: <NewOperation /> },
  { path: '/login', element: <Login /> },
  {
    path: '/operations',
    element: <Operations />,
    children: [{ path: ':operation', element: <Operation /> }],
  },
];

export default routes;
