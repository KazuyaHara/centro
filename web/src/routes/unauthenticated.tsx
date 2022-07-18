import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import SignIn from '../components/pages/auth/signin';
import SignUp from '../components/pages/auth/signup';
import Landing from '../components/pages/landing';

export default function Unauthenticated() {
  return (
    useRoutes([
      {
        path: '/',
        children: [
          { path: '/', element: <Landing /> },
          { path: '/signup', element: <SignUp /> },
          { path: '/signin', element: <SignIn /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ]) || <Landing />
  );
}
