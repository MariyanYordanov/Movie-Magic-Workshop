const { urlencoded, static: handler} = require('express');

function expressConfig(app) {
    app.use(urlencoded({ extended: true }));
    app.use('/static', handler('static'));
};

module.exports = { expressConfig };