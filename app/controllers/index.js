'use strict';

var express = require('express');
var router = express.Router();
var linkModel = require('../models/link');
var debug = require('debug')('controller');

module.exports = function (app) {
  app.use('/', router);
};

function renderIndexMore(res, isFailed, msg) {
  res.render('index-more.html', {
    title: '更多极客目录 - d2g.io',
    failed: isFailed || false,
    message: msg || ''
  });
}

router.get('/', function index(req, res) {
  res.render('index.html', {
    title: '极客目录 - d2g.io'
  });
});

router.get('/more', function index(req, res) {
  renderIndexMore(res, false);
});

router.post('/more', function index(req, res) {
  var paramUrl = req.body.urlinput.trim();
  var paramContact = req.body.contactinput.trim();
  var msg = '';
  var isFailed = true;
  var Link = linkModel.Link;

  if (paramUrl) {
    debug('saving new url %s', paramUrl);
    Link.forge({
      url: paramUrl,
      contact: paramContact
    }).save().then(function () {
      debug('saving new url successfully');
      isFailed = false;
      msg = '新的URL提交成功，谢谢!';
      renderIndexMore(res, isFailed, msg);
    }).catch(function (err) {
      debug('failed to save new url: %s', err.message);
      msg = 'Oops，URL提交失败!';
      renderIndexMore(res, isFailed, msg);
    });
  } else {
    msg = 'Oops，URL地址是必填选项，不可以填写空格什么的!';
    renderIndexMore(res, isFailed, msg);
  }
});



