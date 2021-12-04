
const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.ObjectId;
const taskSchema = mongoose.Schema({
    name:{
     type:String,
     required:true
    },
   status:{
     type:String,
     enum:['Pending','In-Progress','Completed'],
     default:'Pending'
   },
   completion_date:{
     type:Date
   },
   parent_task_id:{
    type:ObjectId,
    default:null
  }
   
});

const TaskList = mongoose.model('TaskList',taskSchema);
module.exports = TaskList;