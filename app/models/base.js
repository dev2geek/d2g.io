'use strict';

var bookshelf = require('bookshelf');
var uuid = require('node-uuid');
var config = require('../../config/config');
var d2gBookshelf = bookshelf(config.database.knex);


d2gBookshelf.plugin('registry');

d2gBookshelf.Model = d2gBookshelf.Model.extend({
  hasTimestamps: true,

  defaults: function () {
    return {
      uuid: uuid.v4()
    };
  }
});

module.exports = d2gBookshelf;
