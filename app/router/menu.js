const express = require('express');
const { addMenu, getMenu, editMenu, deleteMenu } = require('../controller/menu');
const { authAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/menu', authAdmin, addMenu);
router.get('/menu', getMenu);
router.patch('/menu/:id', authAdmin, editMenu);
router.delete('/menu/:id', authAdmin, deleteMenu);

module.exports = router;
