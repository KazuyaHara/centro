import React, { MouseEvent, useState } from 'react';

import { AppBar, Box, Container, Toolbar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import Logo from '../../assets/images/logo/black.png';
import Action from './action';

export default function Navbar() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const onClose = () => setAnchorEl(null);
  const onToggle = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  return (
    <AppBar sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth={location.pathname === '/' ? 'xl' : 'lg'}>
        <Toolbar disableGutters sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Link to="/">
            <Box component="img" src={Logo} sx={{ maxHeight: 24 }} />
          </Link>
          <Action anchorEl={anchorEl} onClose={onClose} onToggle={onToggle} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
