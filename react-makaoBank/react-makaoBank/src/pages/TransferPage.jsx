import { useEffect } from 'react';
import AccountAmount from '../components/AccountAmount';
import TransferForm from '../components/TransferForm copy';

import useBankStore from '../hooks/useBankStore';

export default function TransferPage() {
  const bankStore = useBankStore();

  useEffect(() => {
    bankStore.fetchAccount();
  }, []);

  return (
    <div>
      <AccountAmount />
      <TransferForm />
    </div>
  );
}
