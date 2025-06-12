export default class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  clear() {
    this.transactions = [];
  }

  getAll() {
    return this.transactions;
  }
}
