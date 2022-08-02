import React, { useState } from 'react';

import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Alert from '../../../../../hooks/alert';
import useFootprint from '../../../../../hooks/footprint';
import Form, { Submit } from '../../../../organisms/form/moments/images';

export default function AddMomentImages() {
  const alert = Alert.useContainer();
  const { create } = useFootprint();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onSubmit = async (data: Submit) => {
    setLoading(true);
    await create(data)
      .then(() => navigate('/'))
      .catch(({ message }) => {
        alert.open({ message, severity: 'error' });
        setLoading(false);
      });
  };

  return (
    <Container sx={{ pt: 8 }}>
      <Typography mt={3} variant="h1">
        {t('moment.heading.addImageMoment')}
      </Typography>
      <Form loading={loading} onSubmit={onSubmit} sx={{ mt: 3 }} />
    </Container>
  );
}
