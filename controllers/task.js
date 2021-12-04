
const TaskList = require('../model/task');
const mongoose = require('mongoose');





async function addTask(req,res) {
    const {name,parent_task_id =null,status} = req['body']

    if(!name){
        res.json({
            status:'Error',
            message:'Name is required.'
        });
        return;
    }
  
    const newTaskList = new TaskList({
        name:name ,
        parent_task_id:parent_task_id || null ,
        status:status,
        completion_date:status === 'Completed' ? Date.now():null
    });

    try {
        if(newTaskList){
            newTaskList.save(error =>{
                if(error){
                    res.status(409).json({
                        status:'Error',
                        message:'Something went wrong'
                    }) 
                }else{
                    res.status(201).json({
                        status:'Success',
                        data:newTaskList
                    })
                }
            })
         
        }else{
            res.status(409).json({
                status:'Error',
                message:'Something went wrong'
            })
        }
    } catch (error) {
        return{
            status:'Error',
            message:error.message
        }
    }
    
    
}


 async function checkChild(task){
  
      const child = await TaskList.findOne({ parent_task_id: task._id });
      if(!child) {
          console.log('true')
        return true;
      }
      if(child.status == "In-Progress") {
        throw new Error('child')
      } else {
        const sub_child = await TaskList.findOne({ parent_task_id: child.parent_task_id })
        await checkChild(sub_child)
      }
   
   }

async function deleteChild(task){
  
    const child = await TaskList.findOne({ parent_task_id: task._id });
    if(!child) {
      await TaskList.deleteOne({_id:task._id});
      return true;
    }
    const sub_child = await TaskList.findOne({ parent_task_id: child.parent_task_id });
    await TaskList.deleteOne({_id:child._id});
    await deleteChild(sub_child);
 
 }
  

async function deleteTask(req,res) {
    const{ id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))return res.status(404).send('No data with the id');
    try {
        const task = await TaskList.findById(id)
        if(task.status === 'In-Progress') throw new Error('main');
        await checkChild(task);
        await deleteChild(task);
        await TaskList.deleteOne({_id:id})
        res.json({
            status:'Success',
            message:`Item With ${id} has been deleted`})
    } catch (error) {
        res.json({
            status:'Error',
            message:`Unable to delete`
        })
    }
}





module.exports={
    addTask,
    deleteTask
}