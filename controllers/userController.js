const UserList = require('../model/UserModel');
const { jwtSignInFunction } = require("../libs/jwt/jwtFunctions");

const tutor ={
    email:'test@gmail.com',
    password:'123'
}
 
async function UserLogin(req,res) {
  const {email,password} = req.body;
    try {
        if(!email){
            res.sendStatus(400).json({
                status:'Error',
                message:'Email Not found'
            });
            return;
        }
        if(!password){
            res.sendStatus(400).json({
                status:'Error',
                message:'Password Not Found'
            })
            return;
        }
        if(email === tutor.email && password === tutor.password){
           const token = await jwtSignInFunction(tutor);
            res.json({
                status:'Success',
                message:'Logged In Successfully',
                token
            })
        }else{
            res.json({
                status:'Error',
                message:'Incorrect Username or Password'
            })
        }
    } catch (error) {
        return{
            status:'Error',
            message:error.message
        }
    }

    
}

module.exports ={
    UserLogin
}