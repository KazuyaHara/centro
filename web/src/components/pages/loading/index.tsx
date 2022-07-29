import React from 'react';

import { Box, CircularProgress } from '@mui/material';
import { use100vh } from 'react-div-100vh';

export default function Loading() {
  const height = use100vh();

  return (
    <Box alignItems="center" display="flex" justifyContent="center" minHeight={height || '100vh'}>
      <CircularProgress color="primary" thickness={5} />
    </Box>
  );
}
