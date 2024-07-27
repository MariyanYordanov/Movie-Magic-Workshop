const { Router } = require('express');
const { homeController } = require('../controllers/homeController');

router = Router();

router.get('/', homeController);

module.exports = {router};