const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
  date: Date,
  lesson: Array,
  equipment: String,
  dress: String,
  level: String,
  instructor: String,
  subject: Array,
  
})
lessonSchema.index({name: 'lessontext', 'lesson': 'text'});

module.exports.Lesson = mongoose.model('Lesson', lessonSchema, 'lesson')
