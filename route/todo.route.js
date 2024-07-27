const express = require('express');
const router = express.Router();

const {createTodoController} = require('../controller/todo.controller');


// router.get('/', getTodo);
router.post('/create', createTodoController);

module.exports = router;