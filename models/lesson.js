const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
  lesson: String,
  equipment: String,
  dress: String,
})

module.exports.Lesson = mongoose.model('Lesson', lessonSchema, 'lesson')
