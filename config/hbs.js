// Code to configure handlebars for the app
const exphbs = require('express-handlebars');

function hbsConfig(app) {
  app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
  }));
  app.set('view engine', 'hbs');
};

module.exports = {hbsConfig};