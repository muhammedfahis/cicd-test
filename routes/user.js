const express = require('express');
const { UserLogin } = require('../controllers/user');
const router = express.Router();



/**
 * @api {post} /user/login
 * @apiName UserLogin
 * @apiGroup User
 * @apiParam {String} [email] email of tutor.
 * @apiParam {String} [password] password of tutor.
 *
 * @apiSuccess (200) {String} message TUTOR LOGGED SUCCESSFULLY.
 * @apiSuccess (200) {String} token TOKEN.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *      "message": "TUTOR LOGGED SUCCESSFULLY",
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR1dG9yQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzIiwiaWF0IjoxNjEwODI4MjY2fQ.7fpTmXvPvf1wZbYwVw0ybZQfpSTbq6LdHcg9leCQ48g"
 *    }
 *
 * @apiError LoginFailed INCORRECT USERNAME OR PASSWORD.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "INCORRECT USERNAME OR PASSWORD"
 *      }
 */

 router.post('/login',UserLogin);


module.exports = router;