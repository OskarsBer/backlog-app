const mongoose = require('mongoose')
const gameEntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Unfinished"
  }
})

module.exports = mongoose.model('gameEntry', gameEntrySchema, 'games')