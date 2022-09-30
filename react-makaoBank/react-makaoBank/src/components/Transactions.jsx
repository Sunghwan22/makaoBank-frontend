import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';
import numberFormat from '../utils/numberFormat';

const Container = styled.div`  height: 84vh;
  width: 50%;
  min-height: 80%;
  margin: auto;
  margin-top: 2em;
  
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: .15em;
  font-size: 2em;
  font-weight: bold;
`;

const Hr = styled.div`
  margin: auto;
  padding-top: 4em;
  width: 60%;
  border-top: 2px solid #ABD9FF;
`;

const Tabel = styled.table`
  width: 100%;
`;

const Tr = styled.tr`
  background:linear-gradient(91.29deg, #A79FFF 0%, #A79FFF 100%);
  color: #FFF;
`;

const Th = styled.th`
  padding: 1em 2em;
  border-left: 1px solid #D8D8D8;
  border-right: 1px solid #D8D8D8;
`;

const P = styled.th`
  display: flex;
  justify-content: center;
  padding: 2em;
  color: #A0A0A0;
`;

const List = styled.tr`
  color: #A0A0A0;
  border-bottom: 1px solid #A0A0A0;
`;

const Activity = styled.th`
  padding-right: 1.7em;
  border-bottom: 1px solid #D8D8D8;
  border-right: 1px solid #D8D8D8;
`;
const Name = styled.th`
  padding: 1.5em 3em;
  border-bottom: 1px solid #D8D8D8;
  border-right: 1px solid #D8D8D8;
`;

const Amount = styled.th`
  border-bottom: 1px solid #D8D8D8;
`;

export default function Transactions() {
  const bankStore = useBankStore();

  const { transactions } = bankStore;

  if (!transactions.length) {
    return (
      <p>거래 내역이 없습니다</p>
    );
  }

  return (
    <Container>
      <Title>거래내역</Title>
      <Hr />
      <Tabel>
        <thead>
          <Tr>
            <th>종류</th>
            <Th>계좌번호</Th>
            <th>금액</th>
          </Tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <List>
              <th />
              <P>
                거래 내역이 없습니다
              </P>
            </List>
          ) : (
            transactions.map((transaction) => (
              <List key={transaction.id}>
                <Activity>{transaction.activity}</Activity>
                <Name>{transaction.name}</Name>
                <Amount>
                  {numberFormat(transaction.amount)}
                  원
                </Amount>
              </List>
            ))
          )}
        </tbody>
      </Tabel>
    </Container>
  );
}
