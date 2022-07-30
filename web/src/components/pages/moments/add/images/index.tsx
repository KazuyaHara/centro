import React from 'react';

import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Form from '../../../../organisms/form/moments/images';

export default function AddMomentImages() {
  const { t } = useTranslation();

  return (
    <Container sx={{ pt: 8 }}>
      <Typography mt={3} variant="h1">
        {t('moment.heading.addImageMoment')}
      </Typography>
      <Form sx={{ mt: 3 }} />
    </Container>
  );
}
