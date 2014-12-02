'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.use('/blogs', router);
};

router.all('/', function(req, res) {
  res.render('blogs.html', {
    title: '博客'
  });
});

