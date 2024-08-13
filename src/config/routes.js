const { Router } = require('express');

const { isUser, isGuest } = require('../middlewares/guards');

const { home, details, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { createPost } = require('../controllers/movie');
const { notFound } = require('../controllers/404');
const { castGet, castPost } = require('../controllers/cast');
const { attachGet, attachPost } = require('../controllers/attach');
const { userRouter } = require('../controllers/user');
const { movieRouter } = require('../controllers/movie');

const router = Router();

router.get('/', home);
router.get('/about', about);
router.get('/search', search);

router.get('/cast-create', isUser, castGet);
router.post('/cast-create', isUser, castPost);

router.get('/details/:id', details);
router.get('/attach/:id', isUser, attachGet);
router.post('/attach/:id', isUser, attachPost);

router.use(userRouter);
router.use(movieRouter);

router.get('*', notFound);
router.all('*', notFound);

module.exports = { router };
