import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  getAll() {
    return [
      {
        id: 1,
        amount: 124,
      },
      {
        id: 2,
        amount: 267,
      }
    ]
  }
}
