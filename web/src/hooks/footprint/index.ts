import {
  collection,
  doc,
  DocumentSnapshot,
  FieldValue,
  FirestoreError,
  increment,
  onSnapshot,
  Unsubscribe,
  writeBatch,
} from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

import { Footprint } from '../../../../types';
import { db } from '../../firebase';
import Auth from '../auth';
import { GeocoderResult } from '../map';

type FootprintParams = Omit<Footprint, 'count' | 'createdAt' | 'updatedAt'> & { count: FieldValue };

export default function useFootprint() {
  const auth = Auth.useContainer();
  const { t } = useTranslation();

  const handleError = (error: FirestoreError): Error => {
    switch (error.code) {
      default:
        throw new Error(t('footprint.error.firebase.common'));
    }
  };

  const create = async (geocoderResults: GeocoderResult[]) => {
    const batch = writeBatch(db);
    geocoderResults.forEach((geocoderResult) => {
      const params: FootprintParams = {
        addressComponents: geocoderResult.address_components.map((component, index) => ({
          longName: component.long_name,
          order: index,
          shortName: component.short_name,
          types: component.types,
        })),
        count: increment(1),
        placeId: geocoderResult.place_id,
        types: geocoderResult.types,
      };
      const ref = doc(db, `users/${auth.data.uid}/footprints/${geocoderResult.place_id}`);
      batch.set(ref, params, { merge: true });
    });
    return batch.commit().catch(handleError);
  };

  const formatDoc = (docSnapshot: DocumentSnapshot): Footprint =>
    docSnapshot.data({
      serverTimestamps: 'estimate',
    }) as Footprint;

  const subscribe = (onUpdate: (footprints: Footprint[]) => void): Unsubscribe => {
    const userRef = doc(db, `users/${auth.data.uid}`);
    const footprintsRef = collection(db, userRef.path, 'footprints');

    return onSnapshot(
      footprintsRef,
      (querySnapshot) => onUpdate(querySnapshot.docs.map(formatDoc)),
      () => onUpdate([])
    );
  };

  return { create, subscribe };
}
