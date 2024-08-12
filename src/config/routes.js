const { Router } = require('express');

const { isGuest, isUser } = require('../middlewares/guards');

const { home, details, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { createGet, createPost, editGet, editPost, deleteGet, deletePost } = require('../controllers/movie');
const { notFound } = require('../controllers/404');
const { castGet, castPost } = require('../controllers/cast');
const { attachGet, attachPost } = require('../controllers/attach');
const { userRouter } = require('../controllers/user');

const router = Router();

router.get('/', home);
router.get('/about', about);
router.get('/search', search);

router.get('/create', isUser, createGet);
router.post('/create', isUser, createPost);
router.get('/cast-create', isUser, castGet);
router.post('/cast-create', isUser, castPost);

router.get('/details/:id', details);
router.get('/attach/:id', isUser, attachGet);
router.post('/attach/:id', isUser, attachPost);
router.get('/edit/:id', isUser, editGet);
router.post('/edit/:id', isUser, editPost);
router.get('/delete/:id', isUser, deleteGet);
router.post('/delete/:id', isUser, deletePost);

router.use(userRouter);

router.get('*', notFound);
router.all('*', notFound);

module.exports = { router };
