import React, { useEffect, useState } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import { BrowserRouter } from 'react-router-dom';

import Loading from '../components/pages/loading';
import Auth from '../hooks/auth';
import AuthenticatedRoutes from './authenticated';
import ScrollToTop from './scrollToTop';
import UnauthenticatedRoutes from './unauthenticated';

export default function Routes() {
  const auth = Auth.useContainer();
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY_JAVASCRIPT || '',
      version: 'beta',
    });
    loader.load().then(() => setMapLoaded(true));
  }, []);

  if (auth.initializing || !mapLoaded) return <Loading />;
  return (
    <BrowserRouter>
      <ScrollToTop />
      {auth.isAnonymous ? <UnauthenticatedRoutes /> : <AuthenticatedRoutes />}
    </BrowserRouter>
  );
}
