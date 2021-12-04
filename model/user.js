
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
     type:String,
     required:true
    },
    email:String,
    password:String
   
});

const UserList = mongoose.model('UserList',userSchema);
module.exports = UserList;