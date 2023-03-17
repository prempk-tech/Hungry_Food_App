const mongoose = require('mongoose');

const mealtypes = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  meal_type: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('mealtype', mealtypes)