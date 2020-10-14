const express = require('express');
const { addMenu, getMenu, editMenu, deleteMenu } = require('../controller/menu');

const router = express.Router();

router.post('/menu', addMenu);
router.get('/menu', getMenu);
router.patch('/menu/:id', editMenu);
router.delete('/menu/:id', deleteMenu);

module.exports = router;
