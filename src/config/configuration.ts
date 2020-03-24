export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  database: {
    mongoUri: process.env.MONGO_CS || 'mongodb://localhost/nest'
  },

  amqp: {
    rabbitmqUri: process.env.RABBITMQ_URI || 'amqp://admin:local123@localhost:5672/move6'
  }
});