require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
};

module.exports = config;
