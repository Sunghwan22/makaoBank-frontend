import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ThemeButton from './ui/ThemeButton';

const Container = styled.header`
    width: 100%;
    padding: 1em;
    background: ${(props) => props.theme.colors.panel};

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
  return (
    <Container>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account">잔액 확인</Link>
          </li>
          <li>
            <Link to="/transfer">송금</Link>
          </li>
          <li>
            <Link to="/transactions">거래 내역 확인</Link>
          </li>
        </ul>
        <ThemeButton type="button" onClick={onClick} />
      </nav>
    </Container>
  );
}
