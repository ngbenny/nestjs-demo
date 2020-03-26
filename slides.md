# tech sharing

###### from LOFT

---

## objectives

* sharing studies on NestJS
* reference for MOVE team after LB3 LTS
* currency service journey as demo

---

## currency service specs

* User can Register
* User can Login
* User can create Transaction
* User can query Balance

---

## inside NestJS demo

* Mongoose (Mongo), RabbitMQ (AMQP)
* hybrid of REST and Microservice
* event-based vs request-response
* JWT Auth (PassortJS)
* swagger UI
* over-engineered exercise

---

## currency service specs

* [**REST**] User can Signup
* [**REST**] User can Login
* [**REST**] User can create Transaction
* [**REST**] User can query Balance
* [**Microservice**] System will create Balance
* [**Microservice**] System will update Balance

---

### User Signup Flow

```md
In UsersController (REST)

1. Handle "POST /users"

2. Create user record

3. Publish event 'user.created'
```

> <<< RabbitMQ Message Bus >>>

```md
In BalanceEventsConsumer (event-based microservice)

4. Consume 'user.created'

5. Create balance record
```

Note: Swagger time, view terminal logs

---

### demo time
###### user signup end2end 

---

## create User

---

### POST /users

```typescript
// class UsersController
@Post('/users')
async create(@Res() res, @Body() dto: CreateUserDto): Promise<User> {
  const user = await this.userService.create(dto);

  // publish event 'user.created' to message bus
  const createdEvent = new UserCreatedEvent(user._id);
  this.rmqClient.emit(createdEvent.pattern, createdEvent.payload);

  // return user;
  return res.status(HttpStatus.CREATED).json({
    message: 'User has been created successfully',
    data: {
      _id: user._id,
      username: user.username,
    },
  });
}
```

```md
* `.emit()` is used in event-based fashion (fire-and-forget)
```

---

### create User (database logic)

```typescript
// class UsersService
async create(dto: CreateUserDto): Promise<User> {
  const hashedPassword = await hash(dto.password, 10);
  const createdUser = new this.userModel({
    username: dto.username,
    password: hashedPassword,
  });
  await createdUser.save({ validateBeforeSave: true });
  return await this.userModel.findOne({ username: dto.username });
}
```

---

### create User (model validation)

```typescript
// class UserSchema
export const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
```

Note: demo on duplicate username error

---

## create Balance
#### event-based microservice

---

### consume 'user.created'

```typescript
// class BalanceEventsConsumer
@EventPattern(UserEventPatterns.UserCreated)
async handleUserCreated(@Payload() data: UserCreatedEvent) {
  await this.balancesService.create({ userId: data.userId });
}

```

```md
* `UserEventPatterns.UserCreated` === 'user.created'
* 'user.created' is emitted by UsersController
```

---

### create Balance (database logic)

```typescript
// class BalancesService
async create(dto: CreateBalanceDto): Promise<Balance> {
  const createdBalance = new this.balanceModel({
    userId: dto.userId,
    amount: 0,
  });
  return await createdBalance.save();
}

// BalanceSchema
export const BalanceSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  amount: Number,
  updatedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

```

---

## create Transaction
#### event-based microservice

Note: Swagger time, view terminal logs

---

### demo time
###### create transaction end2end

---

### POST /transactions

```typescript
@UseGuards(JwtAuthGuard)
@Post()
async create(@Res() res, @Request() req, @Body() dto: CreateTransactionDto): Promise<Transaction> {
  dto.userId = req.user._id; // provided by JwtAuthGuard
  const transaction = await this.transactionService.create(dto);

  // publish event 'transaction.created' to message bus
  const createdEvent = new TransactionCreatedEvent(
    transaction.userId,
    transaction.amount,
  );
  this.rmqClient.emit(createdEvent.pattern, createdEvent.payload);

  return res.status(HttpStatus.CREATED).json({
    message: 'Transaction has been created successfully',
    data: transaction,
  });
}
```

---

### update Balance (consume event)

```typescript
// class BalanceEventsConsumer
// consume 'transaction.created'
@EventPattern(TransactionEventPatterns.TransactionCreated)
async handleTransactionCreated(@Payload() data: TransactionCreatedEvent) {
  await this.balancesService.update({
    userId: data.userId,
    amountChange: data.amount,
  });
}
```

---

### update Balance (database logic)

```typescript
// class BalancesService
async update(dto: UpdateBalanceDto): Promise<Balance> {
  const filter = { userId: dto.userId };
  const balance = await this.balanceModel.findOne(filter);
  if (!balance) {
    throw new Error(`Balance not found (userId=${dto.userId})`);
  }

  const newAmount = balance.amount + dto.amountChange;
  await this.balanceModel.updateOne(
    filter,
    { amount: newAmount },
    { upsert: false },
  );
  console.log(
    `Balance updated for user= ${dto.userId}, amount(old)= ${balance.amount}, amount(new)= ${newAmount}`,
  );

  return await this.balanceModel.findOne(filter);
}
```

---

## query Balance
#### REST style

Note: Swagger time, view terminal logs

---

### demo time
###### query balance end2end (REST)

---

### GET /balances?userId=

```typescript
// class BalancesController
@Get()
@ApiQuery({ name: 'userId', required: true })
async findAll(@Res() res, @Query() query): Promise<Balance[]> {
  return await this.balanceService.findAll(query);
}
```
```typescript
// class BalancesService
async findAll(query: QueryBalancesDto): Promise<Balance[]> {
  const sanitizedQuery: Partial<QueryBalancesDto> = pick(query, ['userId']);
  if (!sanitizedQuery.userId) {
    throw new UnprocessableEntityException('userId is not provided');
  }
  return await this.balanceModel.find(sanitizedQuery).exec();
}
```

---

## query Balance
#### RPC style microservice

Note: Swagger time, view terminal logs

---

### demo time
###### query balance end2end (with mock RMQ client)

---

### mocking REST endpoint

```typescript
// class BalancesController
@Post('/messages/query-user-balance')
createQueryUserBalanceCommand(@Body() dto: QueryUserBalanceCommandDto) {
  const msg = new QueryUserBalanceCommand(dto.userId);
  return this.rmqClient.send(msg.pattern, msg.payload).pipe(
    catchError(e => {
      throw new UnprocessableEntityException(e.message);
    }),
  );
}
```

```md
* above will send 'balance.query' to RMQ
* `.send()` is used for request-response fashion
* get exception from microservice
```

---

### consume 'balance.query'

```typescript
@MessagePattern(BalanceEventPatterns.QueryUserBalance)
async handleBalanceQuery(@Payload() data: QueryUserBalanceCommand) {
  console.log(`Query balance for user - ${data.userId}`);
  try {
    return await this.balancesService.findAll({ userId: data.userId });
  } catch (error) {
    throw new RpcException(error);
  }
}
```

```md
* note `@MessagePattern` vs `@EventPattern`
```

---

### exception handling in request-response

```typescript
return this.rmqClient.send(msg.pattern, msg.payload).pipe(
  catchError(e => {
    throw new UnprocessableEntityException(e.message);
  }),
);
```

```typescript
{
  "statusCode": 422,
  "message": "userId is not provided",
  "error": "Unprocessable Entity"
}
```

```md
* note `catchError` - error handling in RxJS way
```

Note: demo query balance while setting user to null

---

## messaging style

##### event based VS request-response

---

## event based

###### Producer / emit()
```ts
this.rmqClient.emit(UserEventPatterns.UserCreated, payload)
```

###### Consumer / @EventPattern
```ts
@EventPattern(UserEventPatterns.UserCreated)
```

---

## request-response

###### Producer / send()
```ts
this.rmqClient.send(BalanceEventPatterns.QueryUserBalance, payload)
```

###### Consumer / @MessagePattern
```ts
@MessagePattern(BalanceEventPatterns.QueryUserBalance)
```

---

## Q & A

---

## A O B

* Explore Golang (e.g. enabling Distributed Tracing)
* Azure Message Bus (replace Queue and Worker)

Note: speaker notes FTW!

---

## Thank You
