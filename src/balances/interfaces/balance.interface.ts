import { Document } from 'mongoose';

export interface Balance extends Document {
  readonly userId: string;
  readonly amount: number;
}
