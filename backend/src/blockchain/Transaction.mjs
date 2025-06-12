import crypto from 'crypto';

export default class Transaction {
  constructor({ sender, recipient, amount }) {
    this.id = crypto.randomUUID();
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
    this.timestamp = Date.now();
  }
}
