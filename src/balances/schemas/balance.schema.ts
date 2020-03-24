import * as mongoose from 'mongoose';

export const BalanceSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  amount: Number,
  updatedAt: Date,
  createdAt: { type: Date, default: Date.now }
});