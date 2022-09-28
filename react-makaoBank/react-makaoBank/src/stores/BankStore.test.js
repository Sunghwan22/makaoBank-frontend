import server from '../testServer';
import BankStore from './BankStore';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('BankStore', () => {
  let bankStore;

  beforeEach(() => {
    bankStore = new BankStore();
  });

  const context = describe;

  describe('BankStore', () => {
    describe('login', () => {
      context('with correct account number and password', () => {
        it('loads account information', async () => {
          await bankStore.login({ accountNumber: '1234', password: 'password' });

          expect(bankStore.name).toBe('Tester');
          expect(bankStore.amount).toBe(100_000);
        });
      });

      context('with incorrect account number and password', () => {
        it('loads account information', async () => {
          await bankStore.login({ accountNumber: '1234234', password: 'Hi' });

          expect(bankStore.name).toBeFalsy();
          expect(bankStore.amount).toBe(0);
        });
      });
    });

    describe('fetchAccount', () => {
      it('sets account information', async () => {
        await bankStore.fetchAccount();

        expect(bankStore.name).toBe('Tester');
        expect(bankStore.accountNumber).toBe('1234');
        expect(bankStore.amount).toBe(100_000);
      });
    });

    describe('fetchAccount', () => {
      context('when request is sucessful', () => {
        it('sets transferState to processing and sucess', async () => {
          await bankStore.requestTransfer({
            to: '1234',
            amount: 100,
            name: 'Test',
          });

          expect(bankStore.transferState).toBe('success');
        });

        it('sets transfer State to processing and fail', async () => {
          await bankStore.requestTransfer({
            to: '1234',
            amount: -100,
            name: 'Test',
          });

          expect(bankStore.errorMessage).toBeTruthy();
        });
      });
    });
  });
});
