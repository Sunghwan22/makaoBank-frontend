import server from '../testServer';
import BankStore from './BankStore';

jest.mock('../services/ApiService');

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

const context = describe;

describe('BankStore', () => {
  describe('login', () => {
    context('with correct account number and password', () => {
      it('loads account information', async () => {
        const bankStore = new BankStore();

        await bankStore.login({ accountNumber: '1234', password: 'password' });

        expect(bankStore.name).toBe('Tester');
        expect(bankStore.amount).toBe(100_000);
      });
    });

    context('with incorrect account number and password', () => {
      it('loads account information', async () => {
        const bankStore = new BankStore();

        await bankStore.login({ accountNumber: '1234234', password: 'Hi' });

        expect(bankStore.name).toBe('');
        expect(bankStore.amount).toBe(0);
      });
    });
  });
});
