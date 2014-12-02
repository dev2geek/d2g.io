'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'd2g.io'
    },
    port: 12265,
    database: {
      mongo: 'mongodb://localhost/d2g-io-development',
      sqlite3: {
        client: 'sqlite3',
        connection: {
          filename: path.join(__dirname, '/../app/data/db/d2g-io-dev.db')
        }
      }
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'd2g.io'
    },
    port: 12265,
    database: {
      mongo: 'mongodb://localhost/d2g-io-test',
      sqlite3: {
        client: 'sqlite3',
        connection: {
          filename: path.join(__dirname, '/../app/data/db/d2g-io-test.db')
        }
      }
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'd2g.io'
    },
    port: 12265,
    database: {
      mongo: 'mongodb://localhost/d2g-io-production',
      sqlite3: {
        client: 'sqlite3',
        connection: {
          filename: path.join(__dirname, '/../app/data/db/d2g-io-prod.db')
        }
      }
    }
  }
};

module.exports = config[env];
