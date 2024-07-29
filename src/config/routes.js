const { Router } = require('express');
const { home, details } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { createGet } = require('../controllers/movie');
const { notFound } = require('../controllers/404');

const router = Router();

router.get('/', home);
router.get('/about', about);
router.get('/details/:id', details);
router.get('/create', createGet);

router.all('*', notFound);

module.exports = { router };