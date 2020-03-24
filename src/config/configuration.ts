export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  database: {
    mongoUri: process.env.MONGO_URL || 'mongodb://localhost/nest'
  },

  messaging: {
    transport: process.env.MESSAGING_TRANSPORT || 'rmq',
    rmq: {
      url: process.env.RMQ_URL || 'amqp://admin:local123@localhost:5672/move6',
      queue: process.env.RMQ_QUEUE || 'currency_queue'
    }
  }
});