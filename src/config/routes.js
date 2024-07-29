const { Router } = require('express');
const { homeController } = require('../controllers/homeController');

const router = Router();

router.get('/', homeController);

module.exports = { router };