const express = require('express');

function expressConfig(app) {
  app.use('static', express.static('static'));
  app.set('view engine', 'ejs');
}

module.exports = expressConfig;