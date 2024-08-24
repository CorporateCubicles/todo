const express = require('express');
const router = express.Router();



const {createTodoController, getAlltodoController, getTodoByIdController, getTodoByNameController, getTodoByStatusController, updateTodoStatusByIdController, deleteTodoByIdController, exportTodoController, importTodoController} = require('../controller/todo.controller');

const multer  = require('multer')
const fs = require('fs');
const storage = multer.memoryStorage();
const upload = multer({storage});

// router.get('/', getTodo);
router.post('/create', createTodoController);
router.get('/',getAlltodoController);

// router.get('/:id', getTodoByIdController);            
router.get('/getbyid/:id', getTodoByIdController);
router.get('/gettodobyname/:name', getTodoByNameController );
router.get('/gettodobystatus/:status', getTodoByStatusController );
router.put('/:id', updateTodoStatusByIdController);
router.delete('/:id', deleteTodoByIdController);
router.get('/export', exportTodoController);
router.post('/import', upload.single('excelData'), importTodoController);


module.exports = router;
