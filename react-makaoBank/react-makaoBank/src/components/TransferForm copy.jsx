import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';

const Error = styled.div`
  color: red;
  font-weight: bold;
`;
// todo : 나중에 버튼 공용으로 뺴서 송금 성공 메시지는 진행중에는 안나오게 해야함

export default function TransferForm() {
  const bankStore = useBankStore();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { to, amount, name } = data;
    await bankStore.requestTransfer({ to, amount, name });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="input-account">
          받을 분 계좌 번호
        </label>
        <input
          id="input-account"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('to', { required: true })}
          type="number"
        />
        {errors.account ? (
          <Error>받으실 분 계좌 번호를 입력해 주세요</Error>
        ) : null}
      </div>
      <div>
        <label htmlFor="input-amount">
          보낼 금액
        </label>
        <input
          id="input-amount"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('amount', { required: true })}
          type="number"
        />
        {errors.amount ? (
          <Error>금액을 입력해 주세요</Error>
        ) : null}
      </div>
      <div>
        <label htmlFor="input-name">
          받는 분께 표시할 이름
        </label>
        <input
          id="input-name"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('name', { required: true })}
          type="text"
        />
        {errors.account ? (
          <Error>이름을 입력해 주세요</Error>
        ) : null}
      </div>
      <button type="submit" disabled={bankStore.trnasferState === 'processing'}>
        보내기
      </button>
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
    </form>
  );
}
