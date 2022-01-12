const mongoose = require('mongoose');

const programSchema = mongoose.Schema({
  lesson: String,
  equipment: String,
  dress: String,
})

module.exports.Program = mongoose.model('Program', programSchema)