'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/sandbox', router);
};

router.all('/', function(req, res) {
  res.render('sandbox.html', {
    title: '沙盒'
  });
});

router.get('/polymer', function(req, res) {
  res.render('polymer.html', {
    title: '沙盒 - Polymer'
  });
});
