import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';
import numberFormat from '../utils/numberFormat';

const Error = styled.div`
  color: red;
  font-size: .4em;
`;

const Input = styled.input`
  padding-top: .1em;
  padding-left: .4em;
  padding-right: .4em;
  margin-bottom: .4em;
  font-size: 1.2em;
`;

const Container = styled.div`
  height: 84vh;
  min-width: 1024px; 
  max-width: 1440px;
  min-height: 100%;
  padding: 5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  }
`;

const H2 = styled.h2`
  color:${(props) => props.theme.colors.homeText};
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  border-bottom: solid 1px #A79FFF;
  padding-bottom: .2em;
  margin-bottom: 1em;
`;

const Label = styled.label`
  color:${(props) => props.theme.colors.homeText};
  font-size: .1em;
  margin-bottom: 1.5em;
`;

const Button = styled.button`
  background:linear-gradient(91.29deg, #A79FFF 0%, #A79FFF 100%);;
  border: none;
  padding-top: .5em;
  padding-bottom: .5em;
  color: white;
`;

const Guide = styled.p`
  font-size: .1em;
`;

export default function TransferForm() {
  const bankStore = useBankStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { to, amount, name } = data;
    await bankStore.requestTransfer({ to, amount, name });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H2>송금</H2>
        <div>
          <Label htmlFor="input-account">
            받을 분 계좌 번호
          </Label>
          <Input
            id="input-account"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('to', { required: true })}
            type="number"
          />
          {errors.account ? (
            <Error>받으실 분 계좌 번호를 입력해 주세요</Error>
          ) : <Guide>하이픈(-) 제외 숫자 8글자를 입력해주세요</Guide>}
        </div>
        <div>
          <Label htmlFor="input-amount">
            보낼 금액
          </Label>
          <Input
            id="input-amount"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('amount', { required: true })}
            type="number"
          />
          {errors.amount ? (
            <Error>금액을 입력해 주세요</Error>
          ) : (
            <Guide>
              {' '}
              {numberFormat(bankStore.amount)}
              원
            </Guide>
          )}
        </div>
        <div>
          <Label htmlFor="input-name">
            받는 분께 표시할 이름
          </Label>
          <Input
            id="input-name"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('name', { required: true })}
            type="text"
          />
          {errors.account ? (
            <Error>이름을 입력해 주세요</Error>
          ) : <Guide>입력 받는 분의 통장에 표시될 이름을 입력해주세요</Guide>}
        </div>
        <div>
          <Button type="submit" disabled={bankStore.trnasferState === 'processing'}>
            보내기
          </Button>
          {bankStore.transferState === 'processing' ? (
            <p>계좌 이체 요청중</p>
          ) : null}
          {bankStore.transferState === 'success' ? (
            <p>계좌 이체 성공</p>
          ) : null}
          {bankStore.transferState === 'fail' ? (
            <Error>
              <p>계좌 이체 실패</p>
              <p>{bankStore.errorMessage}</p>
            </Error>
          ) : null}
        </div>
      </form>
    </Container>
  );
}
