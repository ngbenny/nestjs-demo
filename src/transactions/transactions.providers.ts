import { Connection } from 'mongoose';
import { TransactionSchema } from './schemas/transaction.schema';

// FIXME avoid magic strings

export const transactionsProviders = [
  {
    provide: 'TRANSACTION_MODEL',
    useFactory: (connection: Connection) => connection.model('Transaction', TransactionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];