import { useState } from 'react';

import { createContainer } from 'unstated-next';

function useMap() {
  const [monochrome, setMonochrome] = useState(true);

  const toggleMapStyle = () => setMonochrome(!monochrome);

  return { monochrome, toggleMapStyle };
}

export default createContainer(useMap);
