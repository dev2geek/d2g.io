'use strict';

// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './app/data/db/d2g-io-dev.db'
    },
    migrations: {
      tableName: 'migrations',
      directory: __dirname + '/app/data/migrations'
    }
  }
};
