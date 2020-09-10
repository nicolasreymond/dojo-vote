const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'dojo-election'
    },
    port: process.env.PORT || 3000,
      db: 'mongodb://db:27017'
  },

  test: {
    root: rootPath,
    app: {
      name: 'dojo-election'
    },
    port: process.env.PORT || 3000,
      db: 'mongodb://db:27017'
  },

  production: {
    root: rootPath,
    app: {
      name: 'dojo-election'
    },
    port: process.env.PORT || 3000,
      db: 'mongodb://db:27017'
  }
};

module.exports = config[env];
