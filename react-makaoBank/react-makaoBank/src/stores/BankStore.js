import { apiService } from '../services/ApiService';

export default class BankStore {
  constructor() {
    this.accountNumber = '';
    this.name = '';
    this.amount = 0;
    this.transactions = [];

    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);

    this.publish();
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);

    this.publish();
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  async login({ accountNumber, password }) {
    try {
      const { accountToken, name, amount }
      // eslint-disable-next-line operator-linebreak
      = await apiService.postSession({ accountNumber, password });

      this.name = name;
      this.amount = amount;

      return accountToken;
    } catch (e) {
      return '';
    }
  }

  async fetchAccount() {
    const { name, accountNumber, amount } = await apiService.fetchAccount();
    this.name = name;
    this.accountNumber = accountNumber;
    this.amount = amount;

    this.publish();
  }
}

export const bankStore = new BankStore();
