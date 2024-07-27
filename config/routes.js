const {Router} = require('express');
const router = Router();

router.get('/', homeController);

module.exports = router;