import React from 'react';

import { Alert, Snackbar } from '@mui/material';

import AlertHook from '../../../hooks/alert';

export default function AlertComponent() {
  const alert = AlertHook.useContainer();

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={alert.data.autoHideDuration}
      onClose={alert.close}
      open={alert.data.open}
    >
      <Alert onClose={alert.close} severity={alert.data.severity}>
        {alert.data.message}
      </Alert>
    </Snackbar>
  );
}
