import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import ThemeButton from './ui/ThemeButton';

const Container = styled.header`
    width: 100vw;
    padding: 0.1em;
    background: ${(props) => props.theme.header.color};
    font-size: 0.7em;  
    nav {
        ul{ 
            justify-content: space-between;
            width: 80vw;
            margin-left: 9em;
            display: flex;
            list-style: none;
            align-items: center;
        }

        li {
            margin-right: 1.5em;
            color: white;
        }
    }
`;

const Button = styled.button`
  padding-top: 0.1em;
  padding-bottom: 0.1em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  color: white;
`;

const AccessMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1em;
`;

const List = styled.li`
  padding-top: 0.3em; 
  padding-bottom: 0.3em;
  padding-left: 1em;
  padding-right: 1em;
  background-color: rgba(255, 255, 255, 0.2);
`;

const TransferMenu = styled.div`
  display: flex;
  margin-right: 55em;
  font-size: .7em;
  color: white;
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
            <Link to="/">홈</Link>
          </li>
          {accessToken ? (
            <>
              <TransferMenu>
                <li>
                  <Link to="/account">잔액 확인</Link>
                </li>
                <li>
                  <Link to="/transfer">송금</Link>
                </li>
                <li>
                  <Link to="/transactions">거래 내역 확인</Link>
                </li>
              </TransferMenu>
              <AccessMenu>
                <li>
                  <ThemeButton type="button" onClick={onClick} />
                </li>
                <li>
                  <Button type="button" onClick={handleLogout}>
                    로그아웃
                  </Button>
                </li>
              </AccessMenu>
            </>
          ) : (
            <AccessMenu>
              <li>
                <ThemeButton type="button" onClick={onClick} />
              </li>
              <List>
                <Link to="/login">로그인</Link>
              </List>
              <List>
                <Link to="/register">회원가입</Link>
              </List>
            </AccessMenu>
          )}
        </ul>
      </nav>
    </Container>
  );
}
