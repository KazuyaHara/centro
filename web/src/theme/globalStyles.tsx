import React from 'react';

import { GlobalStyles, Theme } from '@mui/material';

type Props = { theme: Theme };

export default function GlobalCssOverride({ theme }: Props) {
  return (
    <GlobalStyles
      styles={{
        a: { color: theme.palette.primary.main },
        img: { display: 'block', maxWidth: '100%' },

        // Lazy Load Img
        '.blur-up': {
          WebkitFilter: 'blur(5px)',
          filter: 'blur(5px)',
          transition: 'filter 400ms, -webkit-filter 400ms',
        },
        '.blur-up.lazyloaded ': { WebkitFilter: 'blur(0)', filter: 'blur(0)' },
      }}
    />
  );
}
