import { Document } from 'mongoose';

export interface Transaction extends Document {
  readonly userId: string;
  readonly amount: number;
  readonly sourceRequestId: string;
}