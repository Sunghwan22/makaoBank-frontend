/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useBankStore from '../hooks/useBankStore';

const Error = styled.p`
   font-size : .5em;
   color: ${(props) => (props.error ? ' #F00' : '#CCC')};
`;

const Input = styled.input`
   border: ${(props) => (props.error ? '1px solid #F00' : '1px solid#CCC')}; 
   outline: none;
`;

export default function SignUpForm() {
  const bankStore = useBankStore();

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const {
      name, accountNumber, password, confirmPassword,
    } = data;

    await bankStore.register({
      name, accountNumber, password, confirmPassword,
    });

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>SignUp</h2>
      <div>
        <p>이름:</p>
        <label htmlFor="input-name" />
        <Input
          error={errors.name}
          id="input-name"
          {...register('name', { required: /^[가-힣]{3,7}$/ })}
          type="text"
        />
        <Error
          error={errors.name}
        >
          3~7자까지 한글만 사용 가능
        </Error>
      </div>
      <div>
        <p>계좌번호 입력:</p>
        <label htmlFor="input-account-number" />
        <Input
          error={errors.accountNumber}
          id="input-account-number"
          {...register('accountNumber', { required: /^\d{8}$/ })}
          type="number"
        />
        <Error
          error={errors.accountNumber}
        >
          로그인 및 거래시 사용될 계좌번호이며 숫자만 사용 가능(8글자)
        </Error>
      </div>
      <div>
        <p>비밀번호:</p>
        <label htmlFor="input-password" />
        <Input
          id="input-password"
          error={errors.password}
          {...register(
            'password',
            { required: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/ },
          )}
          type="password"
        />
        <Error
          error={errors.password}
        >
          8글자 이상의 영문(대소문자)숫자, 특수문자가 모두 포함되어야 합니다
        </Error>
      </div>
      <div>
        <p>비밀번호 확인:</p>
        <label htmlFor="input-confirm-password" />
        <Input
          id="input-confirm-password"
          error={errors.confirmPassword}
          {...register('confirmPassword', { required: true })}
          type="password"
        />
        {bankStore.errorMessage === '비밀번호가 일치하지 않습니다' ? (
          <Error
            error={bankStore.errorMessage}
          >
            {bankStore.errorMessage}
          </Error>
        )
          : null }
        {bankStore.errorMessage === '이미 존재하는 계좌 번호 입니다' ? (
          <Error
            error={bankStore.errorMessage}
          >
            {bankStore.errorMessage}
          </Error>
        )
          : null }
      </div>
      <button
        type="submit"
      >
        회원가입
      </button>
    </form>
  );
}
