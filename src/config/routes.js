const { userRouter } = require('../controllers/user');
const { castRouter } = require('../controllers/cast');
const { movieRouter } = require('../controllers/movie');
const { catalogController } = require('../controllers/catalog');

function routerConfig(app) {
    app.use(userRouter);
    app.use(castRouter);
    app.use(movieRouter);
    app.use(catalogController);
}

module.exports = { routerConfig };