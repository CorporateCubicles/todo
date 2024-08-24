
const { getAllTodo, getTodoById, getTodoByName, getTodoByStatus, updateTodoById, deleteTodoById, getAllTodoForExport} = require('../business/todo.business');

const business1 = require('../business/todo.business'); 
const {format} = require('date-fns');
const multer  = require('multer')
const fs = require('fs');

const XLSX = require('xlsx');

const storage = multer.memoryStorage();
const upload = multer({storage});

const createTodoController = async (req, res) =>{
    const newItem = {
        todoname: req.body.todoname,
        status: 'TODO',
        createdat: format( new Date(), 'yyyy-MM-dd HH:mm'),
        updatedat: format( new Date(), 'yyyy-MM-dd HH:mm'),

    };
    const item = await business1.createTodo(newItem); //another method
    res.status(202).json(item);

};
//
const getAlltodoController = async(req, res)=>{
    const items = await getAllTodo();
    res.status(202).json(items);
}

const getTodoByIdController = async (req, res) =>{
    const {id} = req.params;
    const item = await getTodoById(id);
    if(!item){
        res.status(404).json({message: 'Given Id not found!!'});
    }
     else{
        res.status(200).json(item);

     }   
    }

const getTodoByNameController = async (req, res)=>{
    const {name} = req.params;
    const item = await getTodoByName(name);
    if(!item){
        res.status(404).json({message: 'Given Todo Name not found!!'});
    }
    else{
        res.status(200).json(item);
    }
} 

const getTodoByStatusController = async (req, res)=>{
    const {status} = req.params;
    const item = await getTodoByStatus(status);
    if(!item){
        res.status(404).json({message: 'Given Todo Status not found!!'});
    }
    else{
        res.status(200).json(item);
    }
} 

const updateTodoStatusByIdController = async (req, res)=>{
    try{
        const {id} = req.params;
    let todoData = await getTodoById(id);
    if(!todoData){
        res.status(404).json({message: 'Given Todo Id not exist!!'});        
    }
    todoData.status = req.body.status;
    todoData.updatedat = format( new Date(), 'yyyy-MM-dd HH:mm');
    const item = await updateTodoById(id, todoData);
    if(!item){
        res.status(404).json({message: 'Given Todo Id not exist!!'});
    }else{
        res.json(item);
    }


    }catch(err){
        res.status(500).send(err);
    }
}

const deleteTodoByIdController = async (req, res) =>{
    const {id} = req.params;
    const deletedItem = await deleteTodoById(id);
    if(!deletedItem){
        res.status(404).json({message: "Given TODO id does not exist"});
    }else {
        res.json({message : `Todo item deleted`});
    }
}

const exportTodoController = async (req, res) =>{
    try{
        const todoData = await getAllTodoForExport();
        const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(todoData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TODO');

    const buffer = XLSX.write(workbook, {bookType: "xlsx", type: "buffer"});

    res.setHeader('Content-Disposition', 'attachment; filename = output.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    res.send(buffer);

    // XLSX.write(res, workbook,{bookSST: true});

    console.log('excel file sent as a response');


    }catch(err){
        res.send(err);
    }

}

const importTodoController = async(req, res)=>{
    try{

        if(!req.file){
            return res.status(400).json({message: 'No file uploaded'});
        }
        const workbook = XLSX.read(req.file.buffer);
        const sheetNames = workbook.SheetNames;

        const excelData = [];
        sheetNames.forEach((sheetName)=>{
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
             excelData.push(...jsonData);
        });

        res.json({message: 'Excel file uploaded', data: excelData});

    }catch(err){
        consol.error('Error in parsing Excel file', err);
        res.status(500).json({message: 'Internal server error'});
    }
};

module.exports = {
    createTodoController,
    getAlltodoController,
    getTodoByIdController,
    getTodoByNameController,
    getTodoByStatusController,
    updateTodoStatusByIdController,
    deleteTodoByIdController,
    exportTodoController,
    importTodoController
}