/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';

import {
  AuthError,
  EmailAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  signInAnonymously,
  Unsubscribe,
} from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { createContainer } from 'unstated-next';

import { auth } from '../../firebase';

type Data = { isAnonymous: boolean; uid: string };
export type LinkWithEmail = { email: string; password: string };
type Return = {
  initializing: boolean;
  isAnonymous: boolean;
  linkWithEmail: (params: LinkWithEmail) => Promise<Error | void>;
};

const initialData = { isAnonymous: true, uid: '' };

function useAuth(): Return {
  const [data, setData] = useState<Data>(initialData);
  const [initializing, setInitializing] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe: Unsubscribe = subscribe();
    return () => unsubscribe();
  }, []);

  const handleError = (error: AuthError): Error => {
    switch (error.code) {
      case 'auth/email-already-in-use':
      case 'auth/requires-recent-login':
      case 'auth/user-disabled':
      case 'auth/user-mismatch':
      case 'auth/user-not-found':
      case 'auth/weak-password':
      case 'auth/wrong-password':
        throw new Error(t(`auth.error.firebase.${error.code}`));
      default:
        throw new Error(t('auth.error.firebase.common'));
    }
  };

  const linkWithEmail = async ({ email, password }: LinkWithEmail): Promise<Error | void> => {
    if (!auth.currentUser) throw new Error(t('auth.error.firebase.common'));
    const credential = EmailAuthProvider.credential(email, password);
    return linkWithCredential(auth.currentUser, credential)
      .then(() => setData({ ...data, isAnonymous: false }))
      .catch(handleError);
  };

  const subscribe = (): Unsubscribe => {
    const onComplete = () => setInitializing(false);
    const onError = () => {};

    return onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setData({ isAnonymous: user.isAnonymous, uid: user.uid });
        } else {
          signInAnonymously(auth);
        }
        onComplete();
      },
      onError,
      onComplete
    );
  };

  return { initializing, isAnonymous: data.isAnonymous, linkWithEmail };
}

export default createContainer(useAuth);
