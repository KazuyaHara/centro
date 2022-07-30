import React from 'react';

import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function AddMomentImages() {
  const { t } = useTranslation();

  return (
    <Container sx={{ pt: 8 }}>
      <Box py={3}>
        <Typography variant="h1">{t('moment.heading.addImageMoment')}</Typography>
      </Box>
    </Container>
  );
}
