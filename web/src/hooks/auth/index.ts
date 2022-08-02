/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';

import {
  AuthError,
  EmailAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  Unsubscribe,
} from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { createContainer } from 'unstated-next';

import { auth } from '../../firebase';

type Data = { isAnonymous: boolean; uid: string };
export type SendPasswordResetEmail = { email: string };
export type SignInWithEmail = { email: string; password: string };
export type LinkWithEmail = SignInWithEmail;

const initialData = { isAnonymous: true, uid: '' };

function useAuth() {
  const [data, setData] = useState<Data>(initialData);
  const [initializing, setInitializing] = useState(true);
  const { i18n, t } = useTranslation();

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

  const sendPasswordResetEmail = async ({
    email,
  }: SendPasswordResetEmail): Promise<Error | void> => {
    auth.languageCode = i18n.language;
    return firebaseSendPasswordResetEmail(auth, email).catch(handleError);
  };

  const signInWithEmail = async ({ email, password }: LinkWithEmail): Promise<Error | void> =>
    signInWithEmailAndPassword(auth, email, password)
      .then(() => undefined)
      .catch(handleError);

  const signOut = async (): Promise<Error | void> => firebaseSignOut(auth).catch(handleError);

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

  return {
    data,
    initializing,
    isAnonymous: data.isAnonymous,
    linkWithEmail,
    sendPasswordResetEmail,
    signInWithEmail,
    signOut,
  };
}

export default createContainer(useAuth);
