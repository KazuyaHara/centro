import React, { ReactNode } from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import palette from './palette';
import typography from './typography';

type ThemeConfigProps = { children: ReactNode };

export default function Theme({ children }: ThemeConfigProps) {
  const theme = createTheme({ palette: { ...palette.light }, typography });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
