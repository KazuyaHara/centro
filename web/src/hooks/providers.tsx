import React, { ReactNode } from 'react';

import Alert from './alert';
import Auth from './auth';

type Props = { children: ReactNode };

export default function Providers({ children }: Props) {
  return (
    <Alert.Provider>
      <Auth.Provider>{children}</Auth.Provider>
    </Alert.Provider>
  );
}
