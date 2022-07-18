import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import Home from '../components/pages/home';

export default function Authenticated() {
  return (
    useRoutes([
      {
        path: '/',
        children: [
          { path: '/', element: <Home /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ]) || <Home />
  );
}
