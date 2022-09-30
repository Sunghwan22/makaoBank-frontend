import { apiService } from '../services/ApiService';

export default class BankStore {
  constructor() {
    this.accountNumber = '';
    this.name = '';
    this.amount = 0;

    this.transactions = [];
    this.transferState = '';

    this.errorMessage = '';

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
      const { accessToken, name, amount }
      // eslint-disable-next-line operator-linebreak
      = await apiService.postSession({ accountNumber, password });

      this.name = name;
      this.amount = amount;

      return accessToken;
    } catch (e) {
      const { message } = e.response.data;
      this.errorMessage = message;

      this.publish();
      return '';
    }
  }

  async register({
    name, accountNumber, password, confirmPassword,
  }) {
    if (password !== confirmPassword) {
      this.errorMessage = '비밀번호가 일치하지 않습니다';
    }
    try {
      const { userName, userAccountNumber } = await apiService.postUser({
        name, accountNumber, password, confirmPassword,
      });

      this.name = userName;
      this.accountNumber = userAccountNumber;
    } catch (e) {
      const { message } = e.response.data;
      this.errorMessage = message;
    }
  }

  async fetchAccount() {
    const { name, accountNumber, amount } = await apiService.fetchAccount();

    this.name = name;
    this.accountNumber = accountNumber;
    this.amount = amount;

    this.publish();
  }

  // 지금 송금에 대한 API서비스를 시작할 것 같다 빠르게 메모하자
  async requestTransfer({ to, amount, name }) {
    this.changeTransferState('processing');

    try {
      await apiService.createTransaction({ to, amount, name });
      this.changeTransferState('success');
    } catch (e) {
      const { message } = e.response.data;
      this.changeTransferState('fail', { errorMessage: message });

      this.publish();
    }
  }

  changeTransferState(state, { errorMessage = '' } = {}) {
    this.errorMessage = errorMessage;
    this.transferState = state;

    this.publish();
  }

  async fetchTransactions() {
    this.transactions = [];
    this.publish();

    this.transactions = await apiService.fetchTransactions();
    this.publish();
  }

  get isTransferProcessing() {
    return this.transferState === 'processing';
  }

  get isTransferSuccess() {
    return this.transferState === 'success';
  }

  get isTransferFail() {
    return this.trnasferState === 'fail';
  }
}

export const bankStore = new BankStore();
