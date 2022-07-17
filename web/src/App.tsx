import React from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import StateProviders from './hooks/providers';
import Routes from './routes';
import './i18n';
import ThemeProvider from './theme';

export default function App() {
  return (
    <HelmetProvider>
      <Helmet defaultTitle="Centro - The palce where you were." titleTemplate="%s | Centro" />
      <ThemeProvider>
        <StateProviders>
          <Routes />
        </StateProviders>
      </ThemeProvider>
    </HelmetProvider>
  );
}
