import Block from './Block.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(transactions) {
    const newBlock = Block.mineBlock({
      previousBlock: this.getLastBlock(),
      transactions,
    });
    this.chain.push(newBlock);
    return newBlock;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, transactions, previousHash, nonce, hash } = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const validatedHash = Block.createHash(
        timestamp,
        transactions,
        previousHash,
        nonce
      );

      if (
        previousHash !== actualLastHash ||
        hash !== validatedHash ||
        !hash.startsWith('0000')
      ) {
        return false;
      }
    }

    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length || !this.isValidChain(newChain)) {
      return false;
    }
    this.chain = newChain;
    return true;
  }
}
