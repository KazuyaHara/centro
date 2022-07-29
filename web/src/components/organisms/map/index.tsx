/* global google */
import React, { memo, useEffect, useRef, useState } from 'react';

import { Box, BoxProps } from '@mui/material';
import { useTranslation } from 'react-i18next';

import MapHook from '../../../hooks/map';
import styles from './styles.json';

export type Center = google.maps.MapOptions['center'];
type Props = Pick<BoxProps, 'sx'> & google.maps.MapOptions;

const defaultOptions: google.maps.MapOptions = {
  fullscreenControl: false,
  keyboardShortcuts: false,
  mapTypeControl: false,
  restriction: {
    latLngBounds: { east: 180, north: 85, south: -85, west: -180 },
    strictBounds: true,
  },
  zoom: 10,
};

function Map({ center, sx, ...mapOptions }: Props) {
  const { monochrome } = MapHook.useContainer();
  const ref = useRef<HTMLDivElement>(null);
  const [, setMap] = useState<google.maps.Map>();
  const { i18n } = useTranslation();

  const defaultCenter = i18n.language.startsWith('ja')
    ? { lat: 35.6809591, lng: 139.7673068 }
    : { lat: 41.892464, lng: 12.485325 };

  useEffect(() => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          ...defaultOptions,
          center: center || defaultCenter,
          styles: monochrome ? styles : null,
          ...mapOptions,
        })
      );
    }
  }, [center, monochrome, ref]);

  return <Box ref={ref} sx={{ height: '100vh', width: '100vw', ...sx }} />;
}

export default memo(Map);
