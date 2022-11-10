const express = require('express');
const {
    addVegitable,
    getVegitableById,
    getAllVegitables
} = require('../controllers/vegitable');
const router = express.Router();
const passport = require('passport');



router.post('/addlist', passport.authenticate('jwt', {
    session: false
}), addVegitable);
router.get('/getList', getAllVegitables);
router.get('/getvegitable/:id', passport.authenticate('jwt', {
    session: false
}), getVegitableById);













module.exports = router