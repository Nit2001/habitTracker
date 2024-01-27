const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  frequency: {
    type: Number,
    required: true
  }
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
