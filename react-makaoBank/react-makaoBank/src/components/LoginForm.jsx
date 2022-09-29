import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import useBankStore from '../hooks/useBankStore';

export default function LoginForm() {
  const navigate = useNavigate();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const bankStore = useBankStore();

  // formState: { errors }
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { accountNumber, password } = data;
    const accessToken = await bankStore.login({ accountNumber, password });
    console.log(accessToken);
    if (accessToken) {
      setAccessToken(accessToken);
      navigate('/');
    }
    // 해당 경로로 간다 지금 경우는 로그인 하면 홈으로 가는 거임
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>로그인</h2>
      <div>
        <label htmlFor="input-account-number">
          계좌 번호
        </label>
        <input
          id="input-account-number"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('accountNumber', { required: true })}
          type="number"
        />
      </div>
      <h2>로그인</h2>
      <div>
        <label htmlFor="input-password">
          비밀번호
        </label>
        <input
          id="input-password"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password', { required: true })}
          type="text"
        />
      </div>
      <button
        type="submit"
      >
        로그인
      </button>
    </form>
  );
}
