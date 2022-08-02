import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import Images from './images';

export default function AddMoment() {
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  if (params.toString().includes('type=images')) return <Images />;
  return <Navigate to="/" />;
}
