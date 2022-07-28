import React, { memo } from 'react';

import { GoogleMap, GoogleMapProps } from '@react-google-maps/api';

const defaultCenter = { lat: 35.6809591, lng: 139.7673068 };
const defaultContainerStyle = { height: '100vh', width: '100vw' };
const defautlZoom = 10;

type Props = Pick<GoogleMapProps, 'center' | 'children' | 'mapContainerStyle' | 'zoom'>;

function Map({
  center = defaultCenter,
  children,
  mapContainerStyle = defaultContainerStyle,
  zoom = defautlZoom,
}: Props) {
  return (
    <GoogleMap
      center={center}
      mapContainerStyle={mapContainerStyle}
      options={{ fullscreenControl: false, keyboardShortcuts: false, mapTypeControl: false }}
      zoom={zoom}
    >
      {children}
    </GoogleMap>
  );
}

export default memo(Map);
