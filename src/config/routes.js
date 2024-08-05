const { Router } = require('express');
const { home, details, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { createGet, createPost } = require('../controllers/movie');
const { notFound } = require('../controllers/404');
const { castGet, castPost } = require('../controllers/cast');

const router = Router();

router.get('/', home);
router.get('/about', about);
router.get('/details/:id', details);
router.get('/create', createGet);
router.post('/create', createPost);
router.get('/search', search);
router.get('/cast-create', castGet);
router.post('/cast-create', castPost);

router.get('*', notFound);
router.all('*', notFound);

module.exports = { router };
