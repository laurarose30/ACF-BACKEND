const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
  date: Date,
  lesson: String,
  equipment: String,
  dress: String

})
lessonSchema.index({name: 'lessontext', 'lesson': 'text'});
module.exports.Lesson = mongoose.model('Lesson', lessonSchema, 'lesson')
