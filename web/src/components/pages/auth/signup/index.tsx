import React, { useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Logo from '../../../../assets/images/logo/black-with-tagline.png';
import Alert from '../../../../hooks/alert';
import Auth from '../../../../hooks/auth';
import Form, { Submit } from '../../../organisms/form/signup';

export default function Signup() {
  const alert = Alert.useContainer();
  const { linkWithEmail } = Auth.useContainer();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSignup = async (data: Submit) => {
    setLoading(true);
    await linkWithEmail(data).catch(({ message }) => {
      alert.open({ message, severity: 'error' });
      setLoading(false);
    });
  };

  return (
    <>
      <Helmet>
        <title>{t('auth.label.signup')}</title>
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
        <Form loading={loading} onSubmit={handleSignup} sx={{ mt: 3 }} />
        <Typography component={Link} mt={3} mx="auto" to="/signin" variant="body2">
          {t('auth.label.alreadyHaveAnAccount')}
        </Typography>
      </Container>
    </>
  );
}
