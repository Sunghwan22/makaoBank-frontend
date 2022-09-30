import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useBankStore from '../hooks/useBankStore';

const Error = styled.p`
   font-size : .5em;
   color: ${(props) => (props.error ? ' #F00' : '#CCC')};
`;

const Input = styled.input`
   border: ${(props) => (props.error ? '1px solid #F00' : '1px solid#CCC')}; 
   outline: none;
`;

export default function LoginForm() {
  const navigate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const bankStore = useBankStore();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { accountNumber, password } = data;
    const accessToken = await bankStore.login({ accountNumber, password });

    if (accessToken) {
      setAccessToken(accessToken);
      navigate('/');
    }

    // bankStore.errorMessage = '';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>USER LOGIN</h2>
      <div>
        <label htmlFor="input-account-number" />
        <Input
          id="input-account-number"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('accountNumber')}
          type="number"
        />
      </div>
      <h2>로그인</h2>
      <div>
        <label htmlFor="input-password" />
        <Input
          id="input-password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password')}
          type="password"
        />
        {bankStore.errorMessage === '아이디 혹은 비밀번호가 맞지 않습니다' ? (
          <Error
            error={bankStore.errorMessage}
          >
            {bankStore.errorMessage}
          </Error>
        ) : null}
        {bankStore.errorMessage === '아이디를 입력해주세요' ? (
          <Error
            error={bankStore.errorMessage}
          >
            {bankStore.errorMessage}
          </Error>
        ) : null}
        {bankStore.errorMessage === '비밀번호를 입력해주세요' ? (
          <Error
            error={bankStore.errorMessage}
          >
            {bankStore.errorMessage}
          </Error>
        ) : null}
      </div>
      <button
        type="submit"
      >
        로그인
      </button>
    </form>
  );
}
