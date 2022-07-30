import React, { MouseEvent } from 'react';

import { AccountCircle, AddPhotoAlternate } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import Auth from '../../hooks/auth';
import Map from '../../hooks/map';

type Props = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onToggle: (event: MouseEvent<HTMLElement>) => void;
};

export default function Action({ anchorEl, onClose, onToggle }: Props) {
  const { signOut } = Auth.useContainer();
  const { monochrome, toggleMapStyle } = Map.useContainer();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <>
      <IconButton
        aria-label="account"
        aria-controls="menu-appbar-account"
        aria-haspopup="true"
        color="primary"
        onClick={onToggle}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        keepMounted
        onClose={onClose}
        open={Boolean(anchorEl)}
        sx={{ mt: '40px' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Typography fontSize={12} px={2} variant="subtitle2">
          {t('menu.subtitle.addMoment')}
        </Typography>
        <MenuItem component={Link} onClick={onClose} to="/moments/add?type=images">
          <ListItemIcon sx={{ minWidth: '28px !important' }}>
            <AddPhotoAlternate color="primary" fontSize="small" />
          </ListItemIcon>
          <Typography fontWeight="bold" lineHeight={1} variant="body2">
            {t('menu.label.addPhotos')}
          </Typography>
        </MenuItem>

        {pathname === '/' && (
          <>
            <Divider />
            <Typography fontSize={12} px={2} variant="subtitle2">
              {t('menu.subtitle.displaySetting')}
            </Typography>
            <MenuItem onClick={toggleMapStyle}>
              <Typography fontWeight="bold" variant="body2">
                {t('menu.label.placesWhereYouWere')}
              </Typography>
              <Switch
                checked={monochrome}
                inputProps={{ 'aria-label': t('menu.label.placesWhereYouWere') }}
                size="small"
                sx={{ ml: 2 }}
              />
            </MenuItem>
          </>
        )}

        <Divider />

        <MenuItem onClick={signOut}>
          <Typography fontWeight="bold" variant="body2">
            {t('auth.label.logout')}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
