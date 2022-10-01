/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async postSession({ accountNumber, password }) {
    const url = `${baseUrl}/session`;
    const { data } = await axios.post(url, { accountNumber, password });

    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async fetchAccount() {
    const url = `${baseUrl}/accounts/me`;
    // Todo : access token을 header로 넘겨 줄 것
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    const { name, accountNumber, amount } = data;

    return { name, accountNumber, amount };
  }

  async createTransaction({ to, amount, name }) {
    const url = `${baseUrl}/transactions`;
    await axios.post(url, { to, amount, name }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async fetchTransactions() {
    const url = `${baseUrl}/transactions`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    const { transactions } = data;
    return transactions;
  }

  async postUser({
    name, accountNumber, password, confirmPassword,
  }) {
    const url = `${baseUrl}/accounts/user`;
    const { data } = await axios.post(url, {
      name, accountNumber, password, confirmPassword,
    });

    const { userName, userAccountNumber } = data;
    return { userName, userAccountNumber };
  }
}

export const apiService = new ApiService();
