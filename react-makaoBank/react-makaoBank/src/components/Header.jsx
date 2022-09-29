import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import ThemeButton from './ui/ThemeButton';

const Container = styled.header`
    width: 100%;
    padding: 1em;

    nav {
        ul{
            display: flex;
            list-style: none;
        }

        li {
            margin-right: 1em;
        }
    }
`;

export default function Header({ onClick }) {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {accessToken ? (
            <>
              <li>
                <Link to="/account">잔액 확인</Link>
              </li>
              <li>
                <Link to="/transfer">송금</Link>
              </li>
              <li>
                <Link to="/transactions">거래 내역 확인</Link>
              </li>
              <button type="button" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </ul>
        <ThemeButton type="button" onClick={onClick} />
      </nav>
    </Container>
  );
}
