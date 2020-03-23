export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  database: {
    mongoCS: process.env.MONGO_CS || 'mongodb://localhost/nest'
  }
});