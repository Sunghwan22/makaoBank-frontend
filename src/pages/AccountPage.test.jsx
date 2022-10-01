import { render, screen, waitFor } from '@testing-library/react';
import AccountPage from './AccountPage';

import server from '../testServer';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

test('Account', () => {
  render(<AccountPage />);

  waitFor(() => {
    screen.getByText(/이름 : Tester/);
    screen.getByText(/계좌번호 : 1234/);
    screen.getByText(/잔액 : 100_000/);
  });
});
