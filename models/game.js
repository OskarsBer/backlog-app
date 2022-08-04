const mongoose = require('mongoose')
const gameEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Playing"
  }
})

module.exports = mongoose.model('gameEntry', gameEntrySchema, 'games')