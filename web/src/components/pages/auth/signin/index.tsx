import React, { useState } from 'react';

import { Box, Container, Stack, Typography } from '@mui/material';
import { use100vh } from 'react-div-100vh';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Logo from '../../../../assets/images/logo/black-with-tagline.png';
import Alert from '../../../../hooks/alert';
import Auth from '../../../../hooks/auth';
import Form, { Submit } from '../../../organisms/form/signin';

export default function SignIn() {
  const alert = Alert.useContainer();
  const { signInWithEmail } = Auth.useContainer();
  const height = use100vh();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSignIn = async (data: Submit) => {
    setLoading(true);
    await signInWithEmail(data).catch(({ message }) => {
      alert.open({ message, severity: 'error' });
      setLoading(false);
    });
  };

  return (
    <>
      <Helmet>
        <title>{t('auth.label.login')}</title>
      </Helmet>
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: height || '100vh',
        }}
      >
        <Box alt="Centro" component="img" mx="auto" src={Logo} sx={{ maxWidth: 180 }} />
        <Form loading={loading} onSubmit={handleSignIn} sx={{ mt: 3 }} />
        <Stack>
          <Typography component={Link} mt={3} mx="auto" to="/reset-password" variant="body2">
            {t('auth.label.forgetPassword')}
          </Typography>
          <Typography component={Link} mt={3} mx="auto" to="/signup" variant="body2">
            {t('auth.label.signup')}
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
