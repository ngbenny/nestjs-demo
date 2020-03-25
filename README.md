<p align="center">
  <a href="https://manulifemove.hk//" target="blank"><img src="https://manulifemove.hk/common/img/brand/Logo.svg" width="320" alt="Nest Logo" /></a>
</p>

# NestJS Demo for MOVE

## Description

Rewrite of move5 currency service with [Nest](https://github.com/nestjs/nest) for demo purpose.

## Installation

```bash
$ npm install
$ npm run init
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# hmr mode
$ npm run start:dev:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

## Topics Highlight

### Folder Structure

* Modularised

### Database / ORM (Mongoose / Mongo)

* e.g. Uniqueness (Balance::UserId)

### HMR

* `webpack-hmr.config.js`
* `npm run start:dev:hmr`

### Config / Env

* [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)
* env is expandable
```
PORT=3000
URL=http://localhost:${PORT}
```

### JWT Auth

* [Full Recipe](https://docs.nestjs.com/v6/techniques/authentication)
* Passport
* Request-scoped

### API Endpoints / Swagger

* [dev Swagger UI](http://localhost:3000/api)
* [dev Swagger UI (JSON)](http://localhost:3002/api-json)
* [swagger](https://docs.nestjs.com/recipes/swagger)
* [swagger (Multiple specifications)](https://docs.nestjs.com/recipes/swagger#multiple-specifications)
* [swagger (auto decorate)](https://docs.nestjs.com/recipes/swagger#plugin)

##### Balance endpoints

* GET http://localhost:3000/v1/balances?userId=123

##### Transaction endpoints

* GET http://localhost:3000/v1/transactions?userId=123
* POST http://localhost:3000/v1/transactions

##### Mock RMQ client endpoints

* POST http://localhost:3000/v1/rmq-client/events/user-created-events
* POST http://localhost:3000/v1/rmq-client/messages/query-user-balance


### Typescript

* @types/Xyz
* Jump to definition
* Compile time type checking
* [warning] not truly runtime safe (TS meta not available in transpiled JS)

### Testing

* jest & supertest
* [Nest Docs](https://docs.nestjs.com/v6/fundamentals/testing)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

### Microservice (RMQ / AMQP)

* Request-response VS event based
* microservice-client (ClientProxy)
* [Custom transport is supported](https://docs.nestjs.com/microservices/custom-transport)
* [Standalone RMQ package](https://github.com/golevelup/nestjs/blob/master/packages/rabbitmq/README.md)

### Error Handling

* http://localhost:3000/v1/balances
```json
{
    "statusCode": 422,
    "message": "userId is not provided",
    "error": "Unprocessable Entity"
}
```

* `RpcException` - microserverversion of HttpException

### Logging

* Built-in configurable loggers
* Override by custom logger
* [Nest Logger](https://docs.nestjs.com/v6/techniques/logger)
* Demo: duplicate user sign up

### Nest CLI

```
nest generate module transactions
nest generate controller transactions
nest generate service transactions

nest generate module balances
nest generate controller balances
nest generate service balances
```

### Docker

### Performance (Fastify)

* Needs a different swagger
https://docs.nestjs.com/recipes/swagger

### NestJS Official Samples

https://github.com/nestjs/nest/tree/master/sample


### [TODO] GraphQL

### [TODO] Websocket

### [TODO] Database Migration

### [TODO] Traditional MVC

### [TODO] Benchmarking

### [TODO] Queue

* https://docs.nestjs.com/techniques/queues
* https://github.com/OptimalBits/bull


------


# Support Nest

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
