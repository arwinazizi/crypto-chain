import dotenv from 'dotenv';
import app from './app.mjs';
import connectDB from './config/db.mjs';
import Blockchain from './blockchain/Blockchain.mjs';
import TransactionPool from './blockchain/TransactionPool.mjs';
import Network from './network/Network.mjs';
import * as blockchainController from './controllers/blockchainController.mjs';

dotenv.config();
connectDB();

const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const network = new Network(blockchain, transactionPool);

// 👇 Gör network tillgängligt för controllern
blockchainController.setNetwork(network);

network.listen();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
