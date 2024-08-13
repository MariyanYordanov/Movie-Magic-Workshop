const { Router } = require('express');

const { notFound } = require('../controllers/404');
const { castRouter } = require('../controllers/cast');
const { userRouter } = require('../controllers/user');
const { movieRouter } = require('../controllers/movie');
const { catalogController } = require('../controllers/catalog');

const router = Router();

router.use(castRouter);
router.use(userRouter);
router.use(movieRouter);
router.use(catalogController);


router.get('*', notFound);
router.all('*', notFound);

module.exports = { router };