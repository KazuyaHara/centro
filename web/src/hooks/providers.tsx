import React, { ReactNode } from 'react';

import Auth from './auth';

type Props = { children: ReactNode };

export default function Providers({ children }: Props) {
  return <Auth.Provider>{children}</Auth.Provider>;
}
