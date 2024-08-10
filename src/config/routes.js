const { Router } = require('express');

const { isGuest, isUser } = require('../middlewares/guards');

const { home, details, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { createGet, createPost } = require('../controllers/movie');
const { notFound } = require('../controllers/404');
const { castGet, castPost } = require('../controllers/cast');
const { attachGet, attachPost } = require('../controllers/attach');
const { loginGet, loginPost, registerGet, registerPost, logout } = require('../controllers/user');

const router = Router();

router.get('/', home);
router.get('/about', about);
router.get('/details/:id', details);
router.get('/search', search);

router.get('/create', isUser, createGet);
router.post('/create', isUser, createPost);
router.get('/cast-create', isUser, castGet);
router.post('/cast-create', isUser, castPost);
router.get('/attach/:id', isUser, attachGet);
router.post('/attach/:id', isUser, attachPost);

router.get('/register', isGuest, registerGet);
router.post('/register', isGuest, registerPost);
router.get('/login', isGuest, loginGet);
router.post('/login', isGuest, loginPost);
router.get('/logout', logout);


router.get('*', notFound);
router.all('*', notFound);

module.exports = { router };
