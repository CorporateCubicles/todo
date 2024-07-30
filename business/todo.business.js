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

const getAllTodo = async() => todo.find();

const getTodoById = async(id) => todo.findById(id);

module.exports ={
    createTodo,
    getAllTodo,
    getTodoById
    
}