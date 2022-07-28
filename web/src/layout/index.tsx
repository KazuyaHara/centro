import React, { ReactElement } from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from './navbar';

export default function Layout(): ReactElement {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
