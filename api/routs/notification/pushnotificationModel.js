
// this is a module DAO for Users
const mongoose = require('mongoose')

const pushNotificationSchema = mongoose.Schema({
_id : mongoose.Schema.Types.ObjectId,
  token: String

})

module.exports = mongoose.model('pushnotification', pushNotificationSchema) 