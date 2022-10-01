import { render, screen, waitFor } from '@testing-library/react';
import { bankStore } from '../stores/BankStore';
import Account from './Account';

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

test('Account', async () => {
  await bankStore.fetchAccount();

  render(<Account />);

  waitFor(() => {
    screen.getByText(/이름 : Tester/);
    screen.getByText(/계좌번호 : 1234/);
    screen.getByText(/잔액 : 100,000원/);
  });
});
