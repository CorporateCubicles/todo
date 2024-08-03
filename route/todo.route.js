const express = require('express');
const router = express.Router();

const {createTodoController, getAlltodoController, getTodoByIdController, getTodoByNameController, getTodoByStatusController, updateTodoStatusByIdController, deleteTodoByIdController, exportTodoController} = require('../controller/todo.controller');


// router.get('/', getTodo);
router.post('/create', createTodoController);
router.get('/',getAlltodoController);

router.get('/:id', getTodoByIdController);
router.get('/gettodobyname/:name', getTodoByNameController );
router.get('/gettodobystatus/:status', getTodoByStatusController );
router.put('/:id', updateTodoStatusByIdController);
router.delete('/:id', deleteTodoByIdController);
router.get('/export', exportTodoController);


module.exports = router;
//