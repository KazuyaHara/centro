import React from 'react';

import { Box, Container } from '@mui/material';

import Logo from '../../../assets/images/logo/black-with-tagline.png';

export default function Landing() {
  return (
    <Box minHeight="100vh">
      <Container>
        <Box
          alt="Centro"
          component="img"
          display="flex"
          mx="auto"
          src={Logo}
          sx={{ maxWidth: 300 }}
        />
      </Container>
    </Box>
  );
}
