import Blockchain from '../blockchain/Blockchain.mjs';
import TransactionPool from '../blockchain/TransactionPool.mjs';
import Transaction from '../blockchain/Transaction.mjs';
import BlockModel from '../models/BlockModel.mjs';
import TransactionModel from '../models/TransactionModel.mjs';

let networkRef = null;

export const setNetwork = (networkInstance) => {
  networkRef = networkInstance;
};


const blockchain = new Blockchain();
const transactionPool = new TransactionPool();

export const getChain = (req, res) => {
  res.json(blockchain.chain);
};

export const getTransactionPool = (req, res) => {
  res.json(transactionPool.getAll());
};

export const addTransaction = (req, res) => {
  const { recipient, amount } = req.body;

  if (!recipient || !amount) {
    return res.status(400).json({ error: 'Invalid transaction data' });
  }

  const tx = new Transaction({
    sender: req.user.username, 
    recipient,
    amount,
  });

  transactionPool.addTransaction(tx);

  // 🧠 Skicka transaktionen till andra noder
  networkRef?.broadcastTransaction(tx);

  res.status(201).json({ message: 'Transaction added', tx });
};
  

export const mineBlock = async (req, res) => {
  try {
    const transactions = transactionPool.getAll();

    if (transactions.length === 0) {
      return res.status(400).json({ error: 'No transactions to mine' });
    }

    const rewardTx = new Transaction({
      sender: 'SYSTEM',
      recipient: req.user.username,
      amount: 50,
    });

    transactions.push(rewardTx);
    const newBlock = blockchain.addBlock(transactions);
    transactionPool.clear();

    // Spara i MongoDB
    await BlockModel.create(newBlock);
    for (const tx of transactions) {
      await TransactionModel.create({
        sender: tx.sender,
        recipient: tx.recipient,
        amount: tx.amount,
        timestamp: tx.timestamp,
        blockHash: newBlock.hash,
      });
    }

    // Broadcast CHAIN (men inte om det redan felat innan)
    console.log('🧱 Mining complete. Broadcasting chain...');
    networkRef?.broadcastChain();
    console.log('🌐 Chain broadcast sent');

    // ✅ SVAR – endast en gång!
    return res.status(201).json({ message: 'Block mined', block: newBlock });
  } catch (err) {
    console.error('❌ Mining error:', err);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Failed to mine block' });
    }
  }
};

  
