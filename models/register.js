const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  role:String
})
module.exports.Register = mongoose.model('Register',registerSchema,'register' )