import React from 'react';
import Widget from './components/Widget';
import MainPage from './pages/MainPage';
import NewOperation from './layouts/NewOperation';
import Login from './Login';

const routes = [
  { path: '/favorites', element: <Widget /> },
  { path: '/main', element: <MainPage /> },
  { path: '/newOperation', element: <NewOperation /> },
  { path: '/login', element: <Login /> },
];

export default routes;
