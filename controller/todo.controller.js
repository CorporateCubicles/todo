
const {createTodo, getAllTodo, getTodoById, getTodoByName, getTodoByStatus, updateTodoById} = require('../business/todo.business');

const {format} = require('date-fns');

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

module.exports = {
    createTodoController,
    getAlltodoController,
    getTodoByIdController,
    getTodoByNameController,
    getTodoByStatusController,
    updateTodoStatusByIdController
}