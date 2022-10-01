import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`
  height: 84vh;
  min-width: 1024px;
  max-width: 1440px;
  min-height: 100%;
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.h2`
   color:${(props) => props.theme.colors.homeText};
   font-size: 1.5em;
   padding-right: 2em;
   padding-left: 2em;
   padding-bottom: .3em;
   border-bottom: solid 1px #A79FFF;
   margin-bottom: 1.5em;
`;

const P = styled.p`
  margin-bottom: 1em;
  padding-right: 5.5em;
  font-size: .7em;
`;

const AccountNumberName = styled.p`
  margin-bottom: 1em;
  padding-right: 9em;
  font-size: .7em;
`;

export default function Account() {
  const bankStore = useBankStore();

  return (
    <Container>
      <H2>잔액확인</H2>
      <AccountNumberName>
        계좌번호
        {' '}
        :
        {' '}
        {bankStore.name}
      </AccountNumberName>
      <AccountNumberName>
        이름
        {' '}
        :
        {' '}
        {bankStore.accountNumber}
      </AccountNumberName>
      <P>
        {bankStore.amount > 0 ? (
          <P>
            잔액
            {' '}
            :
            {' '}
            {numberFormat(bankStore.amount)}
            원
          </P>
        ) : <P>잔액이 없습니다</P>}
      </P>
    </Container>
  );
}
