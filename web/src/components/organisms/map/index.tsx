/* global google */
import React, { memo, useEffect, useRef, useState } from 'react';

import { Box, BoxProps } from '@mui/material';
import { use100vh } from 'react-div-100vh';
import { useTranslation } from 'react-i18next';

import MapHook from '../../../hooks/map';

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
const centroMapId = process.env.REACT_APP_GOOGLE_MAPS_ID_CENTRO || '';
const googleMapId = process.env.REACT_APP_GOOGLE_MAPS_ID_GOOGLE || '';

function Map({ center, sx, ...mapOptions }: Props) {
  const { monochrome } = MapHook.useContainer();
  const height = use100vh();
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
          mapId: monochrome ? centroMapId : googleMapId,
          ...mapOptions,
        })
      );
    }
  }, [center, monochrome, ref]);

  return <Box ref={ref} sx={{ height: height || '100vh', width: '100vw', ...sx }} />;
}

export default memo(Map);
