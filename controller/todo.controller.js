
const {createTodo} = require('../business/todo.business');

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

module.exports = {
    createTodoController,
}