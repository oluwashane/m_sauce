const express = require('express');
const { getOrder, getItemOrdered, placeOrder } = require('../controller/order');
const { authUser } = require('../middleware/auth');

const router = express.Router();

router.post('/order', authUser, placeOrder);
router.get('/order', authUser, getOrder);
router.get('/order/me', authUser, getItemOrdered);

module.exports = router;
