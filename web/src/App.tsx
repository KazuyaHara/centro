import React from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import Landing from './components/pages/landing';
import './i18n';
import ThemeProvider from './theme';

export default function App() {
  return (
    <HelmetProvider>
      <Helmet defaultTitle="Centro - The palce where you were." titleTemplate="%s | Centro" />
      <ThemeProvider>
        <Landing />
      </ThemeProvider>
    </HelmetProvider>
  );
}
