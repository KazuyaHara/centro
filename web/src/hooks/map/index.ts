/* global google */
/* eslint-disable no-use-before-define */
import { RefObject, useEffect, useState } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import stringify from 'json-stable-stringify';
import { useTranslation } from 'react-i18next';
import { createContainer } from 'unstated-next';

type InitMap = google.maps.MapOptions & { ref: RefObject<HTMLDivElement> };
type InitAutocomplete = { ref: RefObject<HTMLInputElement> };
type PlaceResult = Pick<
  google.maps.places.PlaceResult,
  'address_components' | 'formatted_address' | 'geometry'
>;
export type PlaceResultWithId = Pick<
  google.maps.places.PlaceResult,
  'formatted_address' | 'geometry'
> & {
  address_components: Array<google.maps.GeocoderAddressComponent & { place_id: string }>;
};

const boundaries = ['country', 'administrative_area_level_1', 'locality'];
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

  const getPlaceWithId = async () => {
    // get place
    if (!autocomplete) return undefined;
    let place = autocomplete.getPlace() as PlaceResult;
    place = {
      ...place,
      address_components: place.address_components?.filter((component) =>
        component.types.some((type) => boundaries.includes(type))
      ),
    };
    if (!place.address_components) return undefined;

    // get place ids by reverse geocoding
    const geocoder = new google.maps.Geocoder();
    const geocoded = await geocoder
      .geocode({ location: place.geometry?.location })
      .then((response) => response.results);

    // add place ids to place
    const placeWithId: PlaceResultWithId = {
      ...place,
      address_components: place.address_components
        .map((component) => {
          const componentTypes = stringify(component.types);
          const found = geocoded.find(({ types }) => stringify(types) === componentTypes);
          if (!found) return undefined;
          return { ...component, place_id: found.place_id };
        })
        .filter((component): component is NonNullable<typeof component> => component != null),
    };

    return placeWithId.address_components.length === 0 ? undefined : placeWithId;
  };

  const initAutocomplete = ({ ref }: InitAutocomplete) => {
    if (ref.current) {
      const initialized = new google.maps.places.Autocomplete(ref.current);
      initialized.setFields(['address_component', 'formatted_address', 'geometry']);
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

  const toggleMapStyle = () => setMonochrome(!monochrome);

  return {
    autocomplete,
    getPlaceWithId,
    initAutocomplete,
    initMap,
    isLoaded,
    map,
    monochrome,
    toggleMapStyle,
  };
}

export default createContainer(useMap);
