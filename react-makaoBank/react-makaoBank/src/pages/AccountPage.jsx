import { useEffect } from 'react';
import Account from '../components/Account';
import useBankStore from '../hooks/useBankStore';

export default function AccountPage() {
  const bankStore = useBankStore();

  useEffect(() => {
    bankStore.fetchAccount();
    console.log('뱅크 스토어');
  }, []);

  return (
    <Account />
  );
}
