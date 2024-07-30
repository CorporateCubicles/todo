
const {createTodo, getAllTodo, getTodoById} = require('../business/todo.business');

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


module.exports = {
    createTodoController,
    getAlltodoController,
    getTodoByIdController
}