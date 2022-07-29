const niv = require('node-input-validator');
const VegitableList = require('../model/vegitable');
const mongoose = require('mongoose');





async function addVegitable(req, res) {
    const {
        name,
        price,
        color,
        quantity,
        vitamins
    } = req['body']
    const v = new niv.Validator(req.body, {
        name: 'required',
        price: 'required|integer',
        color: 'required',
        quantity: 'required',
        vitamins: 'required|array'
    });
    v.check().then(async (mathed) => {
        if (!mathed) {
            res.status(200).json({
                "status": "failed",
                "message": (v.errors[Object.keys(v.errors)[0]].message),
                error: v.errors
            });
        } else {
            const newVegitableList = new VegitableList({
                name: name,
                price: price,
                color: color,
                quantity: quantity,
                vitamins: vitamins
            });
            try {
                if (newVegitableList) {
                    const newList = await newVegitableList.save();
                    if (newList) {
                        res.status(201).json({
                            status: 'Success',
                            data: newVegitableList
                        })
                    } else {
                        res.status(409).json({
                            status: 'failed',
                            message: 'Something went wrong'
                        })
                    }

                } else {
                    res.status(409).json({
                        status: 'failed',
                        message: 'Something went wrong'
                    })
                }
            } catch (error) {
                return {
                    status: 'failed',
                    message: error.message
                }
            }
        }
    })
}

async function getAllVegitables(req, res) {
    try {

        const {
            searchkey
        } = req.query
        let vegitables = await VegitableList.find({
            name: new RegExp(searchkey, 'i'),
        })
        if (vegitables.length) {
            res.status(200).json({
                status: 'Success',
                data: vegitables
            });
        } else {
            res.status(200).json({
                status: 'Success',
                message: 'No vegitables found'
            });
        }

    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        });
    }
}

async function getVegitableById(req, res) {
    const {
        id
    } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(200).json({
                status: 'failed',
                message: 'No data with id'
            });
        const vegitable = await VegitableList.findById(id);
        if (vegitable) {
            res.status(200).json({
                status: 'Success',
                data: vegitable
            });
        } else {
            res.status(200).json({
                status: 'Success',
                message: 'No vegitable found'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: error.message
        });
    }
}






module.exports = {
    addVegitable,
    getVegitableById,
    getAllVegitables
}