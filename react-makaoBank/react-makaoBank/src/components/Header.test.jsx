import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/lightTheme';
import Header from './Header';

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return jest.fn();
  },
}));

const context = describe;

describe('Header', () => {
  function renderHeader() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <Header />
      </ThemeProvider>
    ));
  }

  context('without logged in', () => {
    beforeEach(() => {
      localStorage.removeItem('accessToken');
    });

    it('renders "로그인" button', () => {
      renderHeader();

      screen.getByText(/Home/);

      screen.getByText(/로그인/);
    });
  });

  context('with logged in', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    });

    it('renders "로그아웃" button', () => {
      renderHeader();

      screen.getByText(/Home/);

      screen.getByText(/로그아웃/);
    });
  });
});
