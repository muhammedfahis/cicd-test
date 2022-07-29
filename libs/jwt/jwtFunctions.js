const jwt = require('jsonwebtoken');


async function jwtSignInFunction(payload) {

    try {
        const strToken = await jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });
        return "Bearer " + strToken;
    } catch (error) {
        new Error(error)
    }
}

const jwtVerifyFunction = async (strToken) => {
    try {
        return await jwt.verify(strToken, process.env.SECRET_KEY)
    } catch (error) {
        new Error(error)
    }
}

const jwtDecodeFunction = async (token) => {
    try {
        return jwt.decode(token, {
            complete: true
        })
    } catch (error) {
        new Error(error)
    }
}


module.exports = {
    jwtSignInFunction,
    jwtVerifyFunction,
    jwtDecodeFunction
}