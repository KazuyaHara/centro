import React, { useEffect, useState } from 'react';

import { Footprint } from '../../../../../types';
import useFootprint from '../../../hooks/footprint';
import Map, { Center } from '../../organisms/map';

export default function Home() {
  const { subscribe } = useFootprint();
  const [center, setCenter] = useState<Center>();
  const [footprints, setFootprints] = useState<Footprint[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) =>
      setCenter({ lat: coords.latitude, lng: coords.longitude })
    );
    const unsubscribe = subscribe(setFootprints);
    return () => unsubscribe();
  }, []);

  return <Map center={center} footprints={footprints} />;
}
