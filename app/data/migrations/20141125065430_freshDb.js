'use strict';

exports.up = function (knex) {

  return knex.schema.createTable('links', function (t) {
    t.increments().primary();
    t.uuid('uuid');
    t.string('url', 16777215).notNullable();
    t.string('contact');
    t.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('links');
};
