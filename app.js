'use strict';

var express = require('express');
var config = require('./config/config');
var app = express();

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('d2g.io server is listening on port ' + this.address().port);
});
