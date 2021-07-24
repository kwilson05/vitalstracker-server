const path = require('path');

module.exports = {
  env:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'development'
      : 'production',
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'photoviewer',
    user: process.env.DB_USER || 'photoviewer',
    password: process.env.DB_PASS || 'photoviewer',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../photoviewer.sqlite3'),
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
  clientDomain: process.env.clientUrl || 'http://localhost:3000',
};
