import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Auth from '../../../hooks/auth';

export default function Home() {
  const { signOut } = Auth.useContainer();
  const { t } = useTranslation();

  return (
    <Box>
      <Typography>This is home screen.</Typography>
      <Button onClick={signOut} type="submit">
        {t('auth.label.logout')}
      </Button>
    </Box>
  );
}
