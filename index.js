const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const taskRouter = require('./routes/task');
const userRouter = require('./routes/user');



const app =  express();
dotenv.config();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded( {limit:'30mb',extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/task',taskRouter);
app.use('/user',userRouter);
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'))
})


module.exports =app;