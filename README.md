<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).

---

# Feature Highlights

## Folder Structure

## Database / ORM (Mongoose / Mongo)

* uniqueness (Balance::UserId)

## HMR

## Config / Env

* [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)
* env is expandable
```
PORT=3000
URL=http://localhost:${PORT}
```

## JWT Auth

## API Endpoints / Swagger

* [dev Swagger UI](http://localhost:3000/api)
* [dev Swagger UI (JSON)](http://localhost:3002/api-json)
* [swagger](https://docs.nestjs.com/recipes/swagger)
* [swagger (Multiple specifications)](https://docs.nestjs.com/recipes/swagger#multiple-specifications)
* [swagger (auto decorate)](https://docs.nestjs.com/recipes/swagger#plugin)

### Balance

* http://localhost:3000/v1/balances?userId=123
* http://localhost:3000/v1/transactions?userId=123

## Typescript

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Microservice (RMQ / AMQP)

* microservice-client

## Error Handling

* http://localhost:3000/v1/balances
```json
{
    "statusCode": 422,
    "message": "userId is not provided",
    "error": "Unprocessable Entity"
}
```

## Logging

## Nest CLI

```
nest generate module transactions
nest generate controller transactions
nest generate service transactions

nest generate module balances
nest generate controller balances
nest generate service balances
```

## Docker

## Performance (Fastify)

needs a different swagger
https://docs.nestjs.com/recipes/swagger

## NestJS Official Samples

https://github.com/nestjs/nest/tree/master/sample

## [Bonus] GraphQL

## [Bonus] Websocket

## [Bonus] Database Migration

## [Bonus] Traditional MVC

## [Bonus] Benchmarking

## [Bonus] Queue

* https://docs.nestjs.com/techniques/queues
* https://github.com/OptimalBits/bull