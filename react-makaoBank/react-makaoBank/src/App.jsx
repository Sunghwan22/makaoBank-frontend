import { Route, Routes } from 'react-router-dom';

import { Reset } from 'styled-reset';

import styled, { ThemeProvider } from 'styled-components';

import { useLocalStorage } from 'usehooks-ts';
import Header from './components/Header';
import AccountPage from './pages/AccountPage';

import Homepage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';

import TransferPage from './pages/TransferPage';

import GlobalStyle from './styles/GlobalStyle';

import darkTheme from './styles/darkTheme';
import defaultTheme from './styles/lightTheme';

const Main = styled.main`
  padding: 1em;
`;

export default function App() {
  const [themeName, setThemeName] = useLocalStorage('theme', 'default');

  const toggleTheme = () => {
    setThemeName(themeName === 'default' ? 'dark' : 'default');
  };

  const theme = themeName === 'dark' ? darkTheme : defaultTheme;

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Header
        onClick={toggleTheme}
      />
      <Main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}
