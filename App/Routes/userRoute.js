const express = require('express');
const { register, verifyOtp, getUserById } = require('../Controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/verify', verifyOtp);
router.get('/user/:id', getUserById);

module.exports = router;