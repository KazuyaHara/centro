import React, { ReactNode } from 'react';

import Alert from './alert';
import Auth from './auth';
import Map from './map';

type Props = { children: ReactNode };

export default function Providers({ children }: Props) {
  return (
    <Alert.Provider>
      <Auth.Provider>
        <Map.Provider>{children}</Map.Provider>
      </Auth.Provider>
    </Alert.Provider>
  );
}
