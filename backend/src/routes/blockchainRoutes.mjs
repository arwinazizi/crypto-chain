import express from 'express';
import {
  getChain,
  getTransactionPool,
  addTransaction,
  mineBlock,
  getTransactions
} from '../controllers/blockchainController.mjs';

import { verifyToken } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/chain', getChain);
router.get('/pool', getTransactionPool);
router.post('/transaction', verifyToken, addTransaction);
router.post('/mine', verifyToken, mineBlock);
router.get('/transactions', verifyToken, getTransactions);

export default router;
