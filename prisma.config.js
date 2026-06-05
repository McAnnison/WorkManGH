require('dotenv').config();

module.exports = {
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    seed: 'node seed.js',
  },
};