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

module.exports ={
    createTodo,
    
}