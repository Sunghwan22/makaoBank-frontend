import { useEffect } from 'react';
import { bankStore } from '../stores/BankStore';
import useForceUpdate from './useForceUpdate';

// 스토어에 변경이 있을 때 마다 나한테 알려달라 그러면 forceupdate를 한다.
export default function useBankStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    bankStore.subscribe(forceUpdate);

    return () => bankStore.unsubscribe(forceUpdate);
  }, []);

  return bankStore;
}
