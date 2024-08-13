const { Router } = require('express');

const { userRouter } = require('../controllers/user');
const { castRouter } = require('../controllers/cast');
const { movieRouter } = require('../controllers/movie');
const { catalogController } = require('../controllers/catalog');

const router = Router();

router.use(userRouter);
router.use(castRouter);
router.use(movieRouter);
router.use(catalogController);

module.exports = { router };