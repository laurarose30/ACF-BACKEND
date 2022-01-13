const mongoose = require('mongoose');

const LessonSchema = mongoose.Schema({
  lesson: String,
  equipment: String,
  dress: String,
})

module.exports.Lesson = mongoose.model('Lesson', LessonSchema)