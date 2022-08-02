/* global google */
import React, { memo, useEffect, useRef, useState } from 'react';

import { Box, BoxProps } from '@mui/material';
import { use100vh } from 'react-div-100vh';

import { Footprint } from '../../../../../types';
import MapHook, { defaultOptions } from '../../../hooks/map';

export type Center = google.maps.MapOptions['center'];
type Props = Pick<BoxProps, 'sx'> & google.maps.MapOptions & { footprints: Footprint[] };

const defaultZoom = defaultOptions.zoom || 10;
const featureColor = '#00838F';

function Map({ center, footprints, sx, ...mapOptions }: Props) {
  const { initMap, map, monochrome } = MapHook.useContainer();
  const height = use100vh();
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(defaultZoom);

  useEffect(() => {
    initMap({ center, ref, ...mapOptions });
  }, [center, monochrome, ref]);

  useEffect(() => {
    if (map) {
      map.addListener('zoom_changed', async () =>
        setZoom(Math.round(map.getZoom() || defaultZoom))
      );
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      // @ts-ignore
      const countryLayer = map.getFeatureLayer('COUNTRY');
      // @ts-ignore
      const admin1Layer = map.getFeatureLayer('ADMINISTRATIVE_AREA_LEVEL_1');
      // @ts-ignore
      const localityLayer = map.getFeatureLayer('LOCALITY');

      // @ts-ignore
      const featureStyleOptions: google.maps.FeatureStyleOptions = {
        fillColor: featureColor,
        fillOpacity: 0.5,
        strokeColor: featureColor,
        strokeOpacity: 1.0,
        strokeWeight: 2.0,
      };

      if (zoom < 5) {
        countryLayer.style = (options: { feature: { placeId: string } }) => {
          const placeIds = footprints.map(({ placeId }) => placeId);
          if (placeIds.includes(options.feature.placeId)) return featureStyleOptions;
          return undefined;
        };
        admin1Layer.style = null;
        localityLayer.style = null;
      } else if (zoom < 10) {
        admin1Layer.style = (options: { feature: { placeId: string } }) => {
          const placeIds = footprints.map(({ placeId }) => placeId);
          if (placeIds.includes(options.feature.placeId)) return featureStyleOptions;
          return undefined;
        };
        countryLayer.style = null;
        localityLayer.style = null;
      } else {
        localityLayer.style = (options: { feature: { placeId: string } }) => {
          const placeIds = footprints.map(({ placeId }) => placeId);
          if (placeIds.includes(options.feature.placeId)) return featureStyleOptions;
          return undefined;
        };
        countryLayer.style = null;
        admin1Layer.style = null;
      }
    }
  }, [footprints, map, zoom]);

  return <Box ref={ref} sx={{ height: height || '100vh', width: '100vw', ...sx }} />;
}

export default memo(Map);
