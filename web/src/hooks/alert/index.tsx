import { useState } from 'react';

import { AlertProps, SnackbarProps } from '@mui/material';
import { createContainer } from 'unstated-next';

type Alert = Pick<AlertProps, 'severity'> &
  Pick<SnackbarProps, 'autoHideDuration' | 'open'> & { message: string };

type Return = { close: () => void; data: Alert; open: (params: Omit<Alert, 'open'>) => void };

const initialData = {
  autoHideDuration: 5000,
  message: '',
  open: false,
  severity: 'info' as AlertProps['severity'],
};

function useAlert(): Return {
  const [data, setData] = useState<Alert>(initialData);

  const close = (): void => setData(initialData);
  const open = ({
    autoHideDuration = initialData.autoHideDuration,
    message,
    severity,
  }: Omit<Alert, 'open'>): void => setData({ autoHideDuration, message, open: true, severity });

  return { close, data, open };
}

export default createContainer(useAlert);
