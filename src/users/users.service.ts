import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 'user001',
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 'user002',
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 'user003',
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
