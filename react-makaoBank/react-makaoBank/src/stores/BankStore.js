import { apiService } from '../services/ApiService';

export default class BankStore {
  constructor() {
    this.accountNumber = '';
    this.name = '';
    this.amount = 0;
    this.transactions = [];
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
}
