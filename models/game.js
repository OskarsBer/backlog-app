const mongoose = require('mongoose')
const gameEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter game title! (required)'],
    minlength: [1, 'Game title too short...'],
    maxlength: [75, 'Game title too long...']
  },
  status: {
    type: String,
    default: "playing"
  }
})

module.exports = mongoose.model('gameEntry', gameEntrySchema, 'games')