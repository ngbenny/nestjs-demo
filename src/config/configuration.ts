export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  database: {
    mongoUri: process.env.MONGO_CS || 'mongodb://localhost/nest'
  }
});