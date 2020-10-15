const express = require('express');
const { authUser } = require('../middleware/auth');
const { register, login, logout, profile } = require('../controller/user');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authUser, logout);
router.get('/profile', authUser, profile);

module.exports = router;
