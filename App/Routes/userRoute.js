const express = require('express');
const { register, verifyOtp, getUserById, login, logout } = require('../Controllers/userController');
const checkSid = require('../Middlewares/checkSid');
const upload = require('../Middlewares/multer');
const router = express.Router();

router.post('/register', upload.single('image'), register);
router.post('/verify', verifyOtp);
router.get('/:id', checkSid, getUserById);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;