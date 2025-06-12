import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  timestamp: Number,
  transactions: Array, // kan förbättras till subdocs senare
  previousHash: String,
  nonce: Number,
  hash: String,
});

export default mongoose.model('Block', blockSchema);
