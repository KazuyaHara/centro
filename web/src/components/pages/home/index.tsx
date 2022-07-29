import React, { useEffect, useState } from 'react';

import Map, { Center } from '../../organisms/map';

export default function Home() {
  const [center, setCenter] = useState<Center>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) =>
      setCenter({ lat: coords.latitude, lng: coords.longitude })
    );
  }, []);

  return <Map center={center} />;
}
