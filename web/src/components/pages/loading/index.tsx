import React from 'react';

import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Box alignItems="center" display="flex" justifyContent="center" minHeight="100vh">
      <CircularProgress color="primary" thickness={5} />
    </Box>
  );
}
