'use strict';

var d2gBookshelf = require('./base');
var debug = require('debug')('model');
var Link;
var Links;

Link = d2gBookshelf.Model.extend({
  tableName: 'links'
});

Links = d2gBookshelf.Collection.extend({
  model: Link
});

debug('Link Model initialized');

module.exports = {
  Link: d2gBookshelf.model('Link', Link),
  Links: d2gBookshelf.collection('Links', Links)
};
