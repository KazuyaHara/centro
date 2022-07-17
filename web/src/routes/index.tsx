import React from 'react';

import Landing from '../components/pages/landing';
import Loading from '../components/pages/loading';
import Auth from '../hooks/auth';

export default function Routes() {
  const auth = Auth.useContainer();

  if (auth.initializing) return <Loading />;
  return <Landing />;
}
