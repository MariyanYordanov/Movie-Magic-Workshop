const { urlencoded, static: handler} = require('express');
const cookieParser = require('cookie-parser');
const { session } = require('../middlewares/session');

const secret = 'mysecret key';

function expressConfig(app) {
    app.use(cookieParser(secret));
    app.use(session);
    app.use(urlencoded({ extended: true }));
    app.use('/static', handler('static'));
};

module.exports = { expressConfig };