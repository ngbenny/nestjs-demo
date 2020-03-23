import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  sourceRequestId: String,
  createdAt: { type: Date, default: Date.now }
});