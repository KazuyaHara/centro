/* global google */
/* eslint-disable no-use-before-define */
import { RefObject, useEffect, useState } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import { useTranslation } from 'react-i18next';
import { createContainer } from 'unstated-next';

export type GeocoderResult = google.maps.GeocoderResult;
type InitMap = google.maps.MapOptions & { ref: RefObject<HTMLDivElement> };
type InitAutocomplete = { ref: RefObject<HTMLInputElement> };
type PlaceResult = Pick<google.maps.places.PlaceResult, 'geometry'>;

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

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_APIKEY_JAVASCRIPT || '',
  libraries: ['places'],
  version: 'beta',
});

function useMap() {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map>();
  const [monochrome, setMonochrome] = useState(true);
  const { i18n } = useTranslation();

  const defaultCenter = i18n.language.startsWith('ja')
    ? { lat: 35.6809591, lng: 139.7673068 }
    : { lat: 41.892464, lng: 12.485325 };

  useEffect(() => {
    loadAPI().then(() => setIsLoaded(true));
  }, []);

  const getPlace = () => {
    if (!autocomplete) return undefined;
    return autocomplete.getPlace() as PlaceResult;
  };

  const initAutocomplete = ({ ref }: InitAutocomplete) => {
    if (ref.current) {
      const initialized = new google.maps.places.Autocomplete(ref.current);
      initialized.setFields(['geometry']);
      setAutocomplete(initialized);
    }
  };

  const initMap = ({ center, ref, ...mapOptions }: InitMap) => {
    if (ref.current) {
      const initialized = new google.maps.Map(ref.current, {
        ...defaultOptions,
        center: center || defaultCenter,
        mapId: monochrome ? centroMapId : googleMapId,
        ...mapOptions,
      });
      setMap(initialized);
    }
  };

  const loadAPI = async () => loader.load();

  const reverseGeocode = async (place: PlaceResult) => {
    const geocoder = new google.maps.Geocoder();
    return geocoder
      .geocode({ location: place.geometry?.location })
      .then((response) => response.results);
  };

  const toggleMapStyle = () => setMonochrome(!monochrome);

  return {
    autocomplete,
    getPlace,
    initAutocomplete,
    initMap,
    isLoaded,
    map,
    monochrome,
    reverseGeocode,
    toggleMapStyle,
  };
}

export default createContainer(useMap);
