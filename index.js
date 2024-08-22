const express = require('express');
const app = express();
const mongoose = require('mongoose');

const todoRoute = require('./route/todo.route');
const userRouter = require('./route/user.route');
const loginRoute = require('./route/login.route');
const {validateJWT} = require('./middleware/verifyJWT');

require('dotenv').config();

const database_Url = process.env.DATABASE_URL;
const dbName = 'todo';

mongoose.connect(database_Url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', ()=>{
    console.log('connected to MongoDB', dbName );
});
//
app.use(express.json());

app.use('/todo', todoRoute);
// app.use('/todo', validateJWT, todoRoute);

app.use('/user',userRouter);

app.use('/auth',loginRoute);

app.get('/', function (req, res) {
  res.send('Hello to the world of Corporate Cubicles!!!');
});

const portNo = process.env.PORT_NO;
app.listen(portNo, ()=>{
    console.log(` Application running on Port Numbers ${portNo}`);
});