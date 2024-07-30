const express = require('express');
const router = express.Router();

const {createTodoController, getAlltodoController, getTodoByIdController} = require('../controller/todo.controller');


// router.get('/', getTodo);
router.post('/create', createTodoController);
router.get('/',getAlltodoController);
router.get('/:id', getTodoByIdController);

module.exports = router;