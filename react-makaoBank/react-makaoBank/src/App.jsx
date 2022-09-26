import { Route, Routes } from 'react-router-dom';

import { Reset } from 'styled-reset';

import styled, { ThemeProvider } from 'styled-components';

import { useEffect, useState } from 'react';

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
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    setTheme(localStorage.getItem('theme') === 'dark' ? darkTheme : defaultTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === defaultTheme ? darkTheme : defaultTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme === defaultTheme ? 'default' : 'dark');
  };

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
