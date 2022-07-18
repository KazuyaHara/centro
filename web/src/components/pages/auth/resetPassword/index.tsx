import React, { useState } from 'react';

import { Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Logo from '../../../../assets/images/logo/black-with-tagline.png';
import Alert from '../../../../hooks/alert';
import Auth from '../../../../hooks/auth';
import Form, { Submit } from '../../../organisms/form/resetPassword';

export default function ResetPassword() {
  const alert = Alert.useContainer();
  const { sendPasswordResetEmail } = Auth.useContainer();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handlePasswordReset = async (data: Submit) => {
    setLoading(true);
    await sendPasswordResetEmail(data)
      .then(() => {
        alert.open({ message: t('auth.label.sentPasswordResetEmail'), severity: 'success' });
        navigate(-1);
      })
      .catch(({ message }) => alert.open({ message, severity: 'error' }))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Helmet>
        <title>{t('auth.label.resetPassword')}</title>
      </Helmet>
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Box alt="Centro" component="img" mx="auto" src={Logo} sx={{ maxWidth: 180 }} />
        <Form loading={loading} onSubmit={handlePasswordReset} sx={{ mt: 3 }} />
      </Container>
    </>
  );
}
