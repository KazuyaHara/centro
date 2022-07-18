import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import Loading from '../components/pages/loading';
import Auth from '../hooks/auth';
import AuthenticatedRoutes from './authenticated';
import ScrollToTop from './scrollToTop';
import UnauthenticatedRoutes from './unauthenticated';

export default function Routes() {
  const auth = Auth.useContainer();

  if (auth.initializing) return <Loading />;
  return (
    <BrowserRouter>
      <ScrollToTop />
      {auth.isAnonymous ? <UnauthenticatedRoutes /> : <AuthenticatedRoutes />}
    </BrowserRouter>
  );
}
