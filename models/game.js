const mongoose = require('mongoose')
const gameEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String
  }
})

module.exports = mongoose.model('gameEntry', gameEntrySchema, 'games')