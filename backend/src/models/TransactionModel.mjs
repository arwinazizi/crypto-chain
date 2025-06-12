import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  amount: Number,
  timestamp: Number,
  blockHash: String,
});

export default mongoose.model('Transaction', transactionSchema);
