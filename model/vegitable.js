const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.ObjectId;
const vegitableSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  vitamins: {
    type: Array,
    required: true
  }

});

const VegitableList = mongoose.model('VegitableList', vegitableSchema);
module.exports = VegitableList;