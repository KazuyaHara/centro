/* global google */
import React, { memo, useEffect, useRef } from 'react';

import { Box, BoxProps } from '@mui/material';
import { use100vh } from 'react-div-100vh';

import MapHook from '../../../hooks/map';

export type Center = google.maps.MapOptions['center'];
type Props = Pick<BoxProps, 'sx'> & google.maps.MapOptions;

function Map({ center, sx, ...mapOptions }: Props) {
  const { initMap, monochrome } = MapHook.useContainer();
  const height = use100vh();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initMap({ center, ref, ...mapOptions });
  }, [center, monochrome, ref]);

  return <Box ref={ref} sx={{ height: height || '100vh', width: '100vw', ...sx }} />;
}

export default memo(Map);
