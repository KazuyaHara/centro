import React from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import ResetPassword from '../components/pages/auth/resetPassword';
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
          { path: '/reset-password', element: <ResetPassword /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ]) || <Landing />
  );
}
