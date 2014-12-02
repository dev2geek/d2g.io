'use strict';

var _ = require('lodash');
var bodyParser = require('body-parser');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var glob = require('glob');
var logger = require('morgan');
var methodOverride = require('method-override');
var knex = require('knex');

var nunjucks = require('nunjucks');

module.exports = function (app, config) {
  var knexInstance;

  if (config.database && config.database.sqlite3) {
    knexInstance = knex(config.database.sqlite3);
    _.merge(config, {
      database: {
        knex: knexInstance
      }
    });
  }

  nunjucks.configure(config.root + '/app/views', {
    autoescape: true,
    express: app
  });

  app.use(favicon(config.root + '/public/images/d2g-300.png'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(cookieParser());
  app.use(compress());
  //app.use(express.static(config.root + '/public'));
  //app.use('/css',express.static(config.root + '/public/stylesheets'));
  app.use('/public', express.static(config.root + '/public'));

  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('not-found.html', {
      title: '404 Error - d2g.io'
    });
  });

  if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
      res.status(err.status || 500);
      res.render('error.html', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};
