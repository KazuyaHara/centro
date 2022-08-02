import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import Home from '../components/pages/home';
import AddMoment from '../components/pages/moments/add';
import Layout from '../layout';

export default function Authenticated() {
  return (
    useRoutes([
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/moments/add', element: <AddMoment /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ]) || <Home />
  );
}
