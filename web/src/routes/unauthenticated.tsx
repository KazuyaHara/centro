import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import Landing from '../components/pages/landing';

export default function Unauthenticated() {
  return (
    useRoutes([
      {
        path: '/',
        children: [
          { path: '/', element: <Landing /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ]) || <Landing />
  );
}
