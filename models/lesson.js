const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
  name: String,
  equipment: String,
  dress: String,
})

module.exports.Lesson = mongoose.model('Lesson', lessonSchema)