const express = require('express');
const {jwtVerifiyer} = require('../libs/middlewares/middlewares')
const {  addTask, deleteTask } = require('../controllers/task');
const router = express.Router();
router.use(jwtVerifiyer)





/**
 * @api {post} /task/addlist
 * @apiName addTask
 * @apiGroup Task
 * @apiHeader {String} Authorization JwtToken
 * @apiParam {String} [name] Name Of Task
 * @apiParam {String} [status] Status Of Task.
 * @apiParam {String} [completion_date] Completed Date.
 * @apiParam {String} [parent_task_id] Parent Task Id.
 *
 *
 * @apiSuccess (201) {Object} newList Added Details Of New Tasks.
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 * {
 * "status": "Success",
 * "data": {
 *   "status": "Pending",
 *   "parent_task_id": "61ab3815f5ff446dae7789a5",
 *   "_id": "61ab382af5ff446dae7789a6",
 *   "name": "child 1 kutti",
 *  "completion_date": null,
 *  "__v": 0
 * }
 *}
 *
 * @apiError Name is required..
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 * "status": "Error",
 * "message": "Name is required."
 *}
 */
router.post('/addlist',addTask);






/**
 * @api {delete} /task/:id  
 * @apiName Delete Task
 * @apiGroup Task
 * @apiParam {String} id Id Of Task
 * 
 * 
 *  
 * @apiSuccess (200) {String} message Item with the {id} has been deleted.
 * 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *   "message": "Item with the 6003546c17aadfeba3cc8f06 has been deleted"
 *   }
 *
 */

router.delete('/:id',deleteTask);






module.exports= router