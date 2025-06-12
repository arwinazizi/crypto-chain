import crypto from 'crypto';

export default class Block {
  constructor({ timestamp, transactions, previousHash, nonce, hash }) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = nonce;
    this.hash = hash;
  }

  static genesis() {
    return new Block({
      timestamp: 1,
      transactions: [],
      previousHash: '0',
      nonce: 0,
      hash: 'genesis-hash',
    });
  }

  static mineBlock({ previousBlock, transactions }) {
    const previousHash = previousBlock.hash;
    let nonce = 0;
    let timestamp, hash;

    do {
      timestamp = Date.now();
      hash = Block.createHash(timestamp, transactions, previousHash, nonce);
      nonce++;
    } while (!hash.startsWith('0000')); // Difficulty level: 4 leading zeros

    return new Block({ timestamp, transactions, previousHash, nonce, hash });
  }

  static createHash(timestamp, transactions, previousHash, nonce) {
    return crypto
      .createHash('sha256')
      .update(
        `${timestamp}${JSON.stringify(transactions)}${previousHash}${nonce}`
      )
      .digest('hex');
  }

  static fromObject(obj) {
    return new Block(obj);
  }
}
