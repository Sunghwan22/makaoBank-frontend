import { useEffect } from 'react';
import TransferForm from '../components/TransferForm';

import useBankStore from '../hooks/useBankStore';

export default function TransferPage() {
  const bankStore = useBankStore();

  useEffect(() => {
    bankStore.fetchAccount();
  }, []);

  return (
    <TransferForm />
  );
}
