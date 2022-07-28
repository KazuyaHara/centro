import React from 'react';

import { useJsApiLoader } from '@react-google-maps/api';
import { BrowserRouter } from 'react-router-dom';

import Loading from '../components/pages/loading';
import Auth from '../hooks/auth';
import AuthenticatedRoutes from './authenticated';
import ScrollToTop from './scrollToTop';
import UnauthenticatedRoutes from './unauthenticated';

export default function Routes() {
  const auth = Auth.useContainer();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY_JAVASCRIPT || '',
  });

  if (auth.initializing || !isLoaded) return <Loading />;
  return (
    <BrowserRouter>
      <ScrollToTop />
      {auth.isAnonymous ? <UnauthenticatedRoutes /> : <AuthenticatedRoutes />}
    </BrowserRouter>
  );
}
