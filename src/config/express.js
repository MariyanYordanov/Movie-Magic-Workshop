const { urlencoded, static: handler} = require('express');
const cookieParser = require('cookie-parser');

const secret = 'mysecret key';

function expressConfig(app) {
    app.use(cookieParser(secret));
    app.use(urlencoded({ extended: true }));
    app.use('/static', handler('static'));
};

module.exports = { expressConfig };