import { useEffect } from 'react';
import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  padding: .5em;
  background: #EEE;
  margin-bottom: 1em;
`;

export default function AccountAmount() {
  const bankStore = useBankStore();

  useEffect(() => {
    bankStore.fetchAccount();
  }, []);

  return (
    <Container>
      잔액:
      {' '}
      {numberFormat(bankStore.amount)}
      원
    </Container>
  );
}
