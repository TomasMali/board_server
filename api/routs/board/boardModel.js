
// this is a module DAO for Users
const mongoose = require('mongoose')

const boardSchema = mongoose.Schema({
_id : mongoose.Schema.Types.ObjectId,
  wi: Number,
  storyPoint: Number,
  sprint: String,
  description: String,
  state: String,
  color: String

})

module.exports = mongoose.model('boards', boardSchema) 