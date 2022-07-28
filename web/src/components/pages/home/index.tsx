import React, { useEffect, useState } from 'react';

import { GoogleMapProps } from '@react-google-maps/api';

import Map from '../../organisms/map';

type Position = GoogleMapProps['center'];

export default function Home() {
  const [position, setPosition] = useState<Position>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) =>
      setPosition({ lat: coords.latitude, lng: coords.longitude })
    );
  }, []);

  return <Map center={position} />;
}
