import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useBankStore from '../hooks/useBankStore';

const Error = styled.p`
   font-size : .5em;
   color: red;
   margin-top: .5em;
`;

const Input = styled.input`
   border: ${(props) => (props.error ? '1px solid #F00' : '1px solid#CCC')}; 
   outline: none;
   padding: 0.5em;
`;

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

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
  }
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

const LoginButton = styled.button`
  background:linear-gradient(91.29deg, #A79FFF 0%, #A79FFF 100%);
  border: none;
  padding-top: .5em;
  padding-bottom:.5em;
  color: white;
  cursor: pointer;
`;

const SignUpButton = styled.button`
  background: transparent;
  border: none;
  padding-top: .5em;
  padding-bottom:.5em;
  color:${(props) => props.theme.colors.homeText};
  cursor: pointer;
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
  };

  const handleClickSignUp = () => {
    navigate('/register');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <H2>USER LOGIN</H2>
        <div>
          <label htmlFor="input-account-number" />
          <Input
            id="input-account-number"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('accountNumber')}
            type="number"
            placeholder="아이디(계좌번호)"
          />
        </div>
        <div>
          <label htmlFor="input-password" />
          <Input
            id="input-password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password')}
            type="password"
            placeholder="비밀번호"
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
        <div>
          <LoginButton
            type="submit"
          >
            로그인
          </LoginButton>
        </div>
        <div>
          <SignUpButton
            type="button"
            onClick={handleClickSignUp}
          >
            회원가입
          </SignUpButton>
        </div>
      </form>
    </Container>
  );
}
