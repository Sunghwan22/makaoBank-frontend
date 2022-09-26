import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AccountPage from './pages/AccountPage';
import Homepage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import TransferPage from './pages/TransferPage';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </div>
  );
}
