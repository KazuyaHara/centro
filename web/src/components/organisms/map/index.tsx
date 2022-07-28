import React, { memo } from 'react';

import { GoogleMap, GoogleMapProps } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';

import MapHook from '../../../hooks/map';
import styles from './styles.json';

const defaultContainerStyle = { height: '100vh', width: '100vw' };
const defautlZoom = 10;

type Props = Pick<GoogleMapProps, 'center' | 'children' | 'mapContainerStyle' | 'zoom'>;

function Map({
  center,
  children,
  mapContainerStyle = defaultContainerStyle,
  zoom = defautlZoom,
}: Props) {
  const { monochrome } = MapHook.useContainer();
  const { i18n } = useTranslation();

  const defaultCenter = i18n.language.startsWith('ja')
    ? { lat: 35.6809591, lng: 139.7673068 }
    : { lat: 41.892464, lng: 12.485325 };

  return (
    <GoogleMap
      center={center || defaultCenter}
      mapContainerStyle={mapContainerStyle}
      options={{
        fullscreenControl: false,
        keyboardShortcuts: false,
        mapTypeControl: false,
        styles: monochrome ? styles : null,
      }}
      zoom={zoom}
    >
      {children}
    </GoogleMap>
  );
}

export default memo(Map);
