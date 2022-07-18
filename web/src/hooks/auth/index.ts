/* eslint-disable no-use-before-define */
import { useEffect, useState } from 'react';

import { onAuthStateChanged, signInAnonymously, Unsubscribe } from 'firebase/auth';
import { createContainer } from 'unstated-next';

import { auth } from '../../firebase';

type Data = { isAnonymous: boolean; uid: string };
type Return = { initializing: boolean; isAnonymous: boolean };

const initialData = { isAnonymous: true, uid: '' };

function useAuth(): Return {
  const [data, setData] = useState<Data>(initialData);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe: Unsubscribe = subscribe();
    return () => unsubscribe();
  }, []);

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

  return { initializing, isAnonymous: data.isAnonymous };
}

export default createContainer(useAuth);
