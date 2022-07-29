const UserList = require('../model/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const niv = require('node-input-validator');
const {
    jwtSignInFunction
} = require('../libs/jwt/jwtFunctions');



const register = (req, res) => {
    const v = new niv.Validator(req.body, {
        email: 'required|email',
        password: 'required|minLength:8'
    });
    v.check().then(async (mathed) => {
        if (!mathed) {
            res.status(200).json({
                "status": "failed",
                "message": (v.errors[Object.keys(v.errors)[0]].message),
                error: v.errors
            })
        } else {
            let reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
            if (!reg.test(req.body.password)) {
                return res.status(200).json({
                    status: 'failed',
                    message: 'Password must include on special character,one capital letter and one number'
                });
            }
            try {
                let password = await bcrypt.hash(req.body.password, 10);
                let newUser = new UserList({
                    email: req.body.email,
                    password: password
                });
                const user = await newUser.save();
                let payload = {
                    email: user.email,
                    password: user.password,
                    _id: user._id
                }
                let jwtToken = await jwtSignInFunction(payload);
                res.status(200).json({
                    status: 'success',
                    message: 'Successfully registered',
                    user: {
                        ...payload,
                        token: jwtToken
                    }
                });
            } catch (error) {
                res.status(500).json({
                    status: 'failed',
                    message: error.message
                });
            }
        }
    })
}

const login = (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    const v = new niv.Validator(req.body, {
        email: 'required|email',
        password: 'required|minLength:8'
    });
    v.check().then(async (mathed) => {
        if (!mathed) {
            res.status(200).json({
                "status": "failed",
                "message": (v.errors[Object.keys(v.errors)[0]].message),
                error: v.errors
            })
        } else {
            try {
                let user = await UserList.findOne({
                    email: email
                });
                if (!user) {
                    res.status(200).json({
                        "status": "failed",
                        "message": 'User not found',
                    })
                } else {
                    if (await bcrypt.compare(password, user.password)) {
                        let payload = {
                            email: user.email,
                            password: user.password,
                            _id: user._id
                        }
                        let jwtToken = await jwtSignInFunction(payload);
                        res.status(200).json({
                            status: 'success',
                            message: 'Login was success',
                            user: {
                                ...payload,
                                token: jwtToken
                            }
                        });
                    } else {
                        res.status(200).json({
                            "status": "failed",
                            "message": 'Wrong Password',
                        })
                    }
                }
            } catch (error) {
                res.status(500).json({
                    status: 'failed',
                    message: error.message
                });
            }

        }
    })
}
module.exports = {
    login,
    register
}