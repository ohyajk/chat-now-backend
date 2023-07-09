const express = require('express');
const defaultController = require('../Controllers/defaultController');

const router = express.Router();

router.use('/', defaultController);

module.exports = router;