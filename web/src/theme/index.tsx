import React, { ReactNode } from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

type ThemeConfigProps = { children: ReactNode };

export default function Theme({ children }: ThemeConfigProps) {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
