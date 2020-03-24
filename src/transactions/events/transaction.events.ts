export enum TransactionEventPatterns {
  TransactionCreated = 'transaction.created',
}

export abstract class TransactionEvent {
  abstract get pattern(): string;
  abstract get payload(): any;
}

export class TransactionCreatedEvent implements TransactionEvent {
  constructor(public userId: string, public amount: number) {}
  get payload(): any {
    return {
      userId: this.userId,
      amount: this.amount,
    };
  }
  get pattern(): string {
    return TransactionEventPatterns.TransactionCreated;
  }
}
