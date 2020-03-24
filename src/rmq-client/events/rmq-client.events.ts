// TODO move to user domain

export enum UserEventPatterns {
  UserCreated = 'user.created'
}

export abstract class UserEvent {
  abstract get pattern(): string;
  abstract get payload(): any;
}

export class UserCreatedEvent implements UserEvent {
  constructor(public userId: string) {}
  get payload(): any {
    return {
      userId: this.userId,
    };
  }
  get pattern(): string {
    return UserEventPatterns.UserCreated;
  }
}

export enum BalanceEventPatterns {
  QueryUserBalance = 'balance.query'
}

export class QueryUserBalanceCommand {
  constructor(public userId: string) {}
  get payload(): any {
    return {
      userId: this.userId,
    };
  }
  get pattern(): string {
    return BalanceEventPatterns.QueryUserBalance;
  }
}


