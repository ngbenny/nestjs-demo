import * as mongoose from 'mongoose';

export const BalanceSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  updatedAt: Date,
  createdAt: { type: Date, default: Date.now }
});