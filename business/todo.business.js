const todo = require('../model/todo.schema');

const createTodo = async(todoData)=>{ 
    try{
        const newTodo = new todo(todoData);
        await newTodo.save();
        return newTodo;
    } catch(err){
        throw err;
    }
}
//

const getAllTodo = async() => todo.find();

const getTodoById = async(id) => todo.findById(id);

// const getTodoById = async(todoId) => todo.findOne({_id: todoId});

const getTodoByName = async(name) => todo.findOne({todoname: name});

const getTodoByStatus = async(status) => todo.find({status: status}, {todoname: 1, status: 1, _id: 0});

const updateTodoById = async(id, updatedTodoData) => todo.findByIdAndUpdate(id, updatedTodoData,{ new:true,}); 

const deleteTodoById = async(id) =>{
    try{
        const deletedTodo = await todo.findByIdAndDelete(id);
        return deletedTodo;

    } catch(error){
        throw error;
    }
}

module.exports ={
    createTodo,
    getAllTodo,
    getTodoById,
    getTodoByName,
    getTodoByStatus,
    updateTodoById,
    deleteTodoById
    
}