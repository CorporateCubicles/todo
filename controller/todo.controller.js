
const {createTodo, getAllTodo, getTodoById, getTodoByName, getTodoByStatus, updateTodoById, deleteTodoById} = require('../business/todo.business');

const {format} = require('date-fns');

const XLSX = require('xlsx');

const createTodoController = async (req, res) =>{
    const newItem = {
        todoname: req.body.todoname,
        status: 'TODO',
        createdat: format( new Date(), 'yyyy-MM-dd HH:mm'),
        updatedat: format( new Date(), 'yyyy-MM-dd HH:mm'),

    };
    const item = await createTodo(newItem);
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

// const exportTodoController = async (req, res) =>{
//     try{
//         const todoData = await getAlltodoController();
//         const workbook = XLSX.utils.book_new();

//     const worksheet = XLSX.utils.json_to_sheet(todoData);
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'TODO');

//     res.setHeader('Content-Disposition', 'attachment; filename = output.xlsx');
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

//     XLSX.write(res, workbook,{bookSST: true});

//     console.log('excel file sent as a response');


//     }catch(err){
//         throw err;
//     }

// }

const exportTodoController = async (req, res) => {
    // try {
    //     // Fetch all todos
    //     const todoData = await getAllTodo(); // Directly calling the business logic function

    //     if (todoData.length === 0) {
    //         return res.status(404).send('No todos found to export');
    //     }

    //     // Create a new Excel workbook and worksheet
    //     const workbook = XLSX.utils.book_new();
    //     const worksheet = XLSX.utils.json_to_sheet(todoData);
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'TODO');

    //     // Convert workbook to a buffer
    //     const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    //     // Send Excel file in the response
    //     res.setHeader('Content-Disposition', 'attachment; filename=output.xlsx');
    //     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    //     res.send(buffer);

    //     console.log('Excel file sent as a response');
    // } catch (err) {
    //     console.error('Error exporting data:', err);
    //     res.status(500).send('Error exporting data');
    // }
};

module.exports = {
    createTodoController,
    getAlltodoController,
    getTodoByIdController,
    getTodoByNameController,
    getTodoByStatusController,
    updateTodoStatusByIdController,
    deleteTodoByIdController,
    exportTodoController
}