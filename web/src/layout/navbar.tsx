import React, { ReactElement } from 'react';

import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/logo/black.png';
import Auth from '../hooks/auth';

export default function DashboardNavbar(): ReactElement {
  const { signOut } = Auth.useContainer();
  const { t } = useTranslation();

  return (
    <AppBar sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container>
        <Toolbar disableGutters sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Link to="/">
            <Box component="img" src={Logo} sx={{ maxHeight: 24 }} />
          </Link>
          <Button onClick={signOut} type="submit">
            {t('auth.label.logout')}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
