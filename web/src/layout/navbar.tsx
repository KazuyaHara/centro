import React, { MouseEvent, useState } from 'react';

import { AccountCircle } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/logo/black.png';
import Auth from '../hooks/auth';
import Map from '../hooks/map';

export default function DashboardNavbar() {
  const { signOut } = Auth.useContainer();
  const { monochrome, toggleMapStyle } = Map.useContainer();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();

  const closeMenu = () => setAnchorEl(null);
  const toggleMenu = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  return (
    <AppBar sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container>
        <Toolbar disableGutters sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Link to="/">
            <Box component="img" src={Logo} sx={{ maxHeight: 24 }} />
          </Link>
          <Box>
            <IconButton
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="primary"
              onClick={toggleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              keepMounted
              onClose={closeMenu}
              open={Boolean(anchorEl)}
              sx={{ mt: '40px' }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem onClick={toggleMapStyle}>
                <Typography fontWeight="bold" variant="body2">
                  {t('map.monochromeMap')}
                </Typography>
                <Switch
                  checked={monochrome}
                  inputProps={{ 'aria-label': t('map.monochromeMap') }}
                  size="small"
                  sx={{ ml: 2 }}
                />
              </MenuItem>
              <Divider />
              <MenuItem onClick={signOut}>
                <Typography fontWeight="bold" variant="body2">
                  {t('auth.label.logout')}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
